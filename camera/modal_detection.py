import os
import modal
import numpy as np
import shutil
import base64
import subprocess
from collections import defaultdict
import json
import cv2
from ultralytics import YOLO
import supervision as sv

# Create base image with minimal dependencies
base_image = (
    modal.Image.debian_slim()
    .pip_install(
        "ultralytics",
        "supervision",
        "opencv-python-headless",
    )
    .apt_install("ffmpeg")
)

# Create detection image with all dependencies
detection_image = (
    base_image
    .pip_install(
        "numpy",
        "ffmpeg-python"
    )
    .add_local_dir(os.path.join(os.getcwd(), 'test_videos'), remote_path="/root/test_videos")
)

# Create app for Modal
app = modal.App()

# Create a volume to store processed output
output_volume = modal.Volume.from_name("drone-detection-output", create_if_missing=True)

# Ensure test_videos directory exists
test_videos_dir = os.path.join(os.getcwd(), 'test_videos')
os.makedirs(test_videos_dir, exist_ok=True)

@app.function(
    image=detection_image,
    gpu="T4",
    volumes={"/root/processed_output": output_volume}
)
def detect_objects(video_path: str):
    """Process video with YOLOv8 model and track objects."""
    model = YOLO("yolov8x.pt")
    
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        return None

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Processing video: {video_path}")
    print(f"Resolution: {frame_width}x{frame_height}, FPS: {fps}, Total Frames: {total_frames}")

    video_filename = os.path.basename(video_path)
    base_name = os.path.splitext(video_filename)[0]
    output_video_path = os.path.join("/root/processed_output", f"{base_name}_detected.mp4")
    json_output_path = os.path.join("/root/processed_output", f"{base_name}_detections.json")
    
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))
    if not out.isOpened():
        print("Error: Could not create video writer")
        cap.release()
        return None

    tracker = sv.ByteTrack()
    box_annotator = sv.BoxAnnotator(thickness=2, text_thickness=1, text_scale=0.5)

    frame_count = 0
    unique_objects = defaultdict(set)
    detections_per_frame = []

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            frame_count += 1
            if frame_count % 10 == 0:
                print(f"Processing frame {frame_count}/{total_frames}")

            results = model(frame, verbose=True)[0]
            detections = sv.Detections.from_ultralytics(results)
            detections = tracker.update_with_detections(detections)

            for d, label in zip(detections, results.names[detections.class_id]):
                unique_objects[label].add(int(d.tracker_id))

            labels = [
                f"{results.names[class_id]} {tracker_id}"
                for class_id, tracker_id
                in zip(detections.class_id, detections.tracker_id)
            ]
            frame = box_annotator.annotate(scene=frame, detections=detections, labels=labels)

            out.write(frame)

    except Exception as e:
        print(f"Error during video processing: {e}")
        cap.release()
        out.release()
        return None

    cap.release()
    out.release()

    print(f"\nProcessed {frame_count} frames")
    print("\nUnique Object Summary:")
    for obj, ids in unique_objects.items():
        print(f"{obj}: {len(ids)} unique instances")

    detection_summary = {
        "video_info": {
            "filename": video_filename,
            "resolution": f"{frame_width}x{frame_height}",
            "fps": fps,
            "total_frames": total_frames,
            "processed_frames": frame_count
        },
        "unique_objects": {k: len(v) for k, v in unique_objects.items()}
    }

    with open(json_output_path, 'w') as f:
        json.dump(detection_summary, f, indent=2)

    print("\nProcessing complete!")
    print(f"Output video saved to: {output_video_path}")
    print(f"Detection summary saved to: {json_output_path}")

    return detection_summary

@app.function(image=base_image, volumes={"/root/processed_output": output_volume})
def copy_output_to_local():
    """Copy processed files from Modal volume to local directory."""
    import os
    import base64
    
    output_dir = "/root/processed_output"
    files = os.listdir(output_dir)
    print(f"Found {len(files)} files in remote directory:")
    for file in files:
        print(f"- {file}")
    
    file_contents = {}
    for file in files:
        file_path = os.path.join(output_dir, file)
        file_size = os.path.getsize(file_path)
        print(f"Reading {file_path} ({file_size} bytes)")
        
        with open(file_path, 'rb') as f:
            content = f.read()
            print(f"Read {len(content)} bytes from {file}")
            file_contents[file] = base64.b64encode(content).decode('utf-8')
    
    return file_contents

@app.local_entrypoint()
def main():
    """Main function to run the object detection pipeline."""
    video_dir = os.path.join(os.getcwd(), 'test_videos')
    video_files = [f for f in os.listdir(video_dir) if f.endswith(('.mp4', '.avi', '.mov'))]
    
    if not video_files:
        print("No video files found in test_videos directory.")
        return
    
    print("Found", len(video_files), "videos:")
    for i, video in enumerate(video_files, 1):
        print(f"{i}. {video}")
    
    print("\nProcessing first video:", video_files[0])
    
    processed_dir = os.path.join(os.getcwd(), "processed_output")
    os.makedirs(processed_dir, exist_ok=True)
    
    results = detect_objects.remote(video_files[0])
    
    if results and 'unique_objects' in results:
        print("\nUnique Object Summary:")
        for obj, count in results['unique_objects'].items():
            print(f"{obj}: {count} unique instances")
    
    print("\nCopying output files to local directory...")
    file_contents = copy_output_to_local.remote()
    
    for filename, content in file_contents.items():
        local_path = os.path.join(processed_dir, filename)
        try:
            decoded_content = base64.b64decode(content)
            print(f"Writing {len(decoded_content)} bytes to {filename}")
            with open(local_path, 'wb') as f:
                f.write(decoded_content)
            print(f"Saved {filename} ({os.path.getsize(local_path)} bytes) to {local_path}")
        except Exception as e:
            print(f"Error saving {filename}: {str(e)}")

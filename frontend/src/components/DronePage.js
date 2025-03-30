import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

const formatText = (text) => {
  // Split into lines
  const lines = text.split('\n');
  let formattedLines = [];
  let inJson = false;
  let jsonContent = '';

  for (const line of lines) {
    if (line.includes('{') && !inJson) {
      inJson = true;
      jsonContent = line;
    } else if (inJson) {
      jsonContent += line;
      if (line.includes('}')) {
        inJson = false;
        try {
          const parsed = JSON.parse(jsonContent);
          formattedLines.push(JSON.stringify(parsed, null, 2));
        } catch {
          formattedLines.push(jsonContent);
        }
        jsonContent = '';
      }
    } else {
      formattedLines.push(line);
    }
  }

  return formattedLines.join('\n');
};

const mockData = {
  '1': `Starting Threat Response Agent...
Polling for new detections...
Running in mock mode. Loading data from mock_detections.json
Processing detection: Unknown
Analysis complete
Response plan complete
Agency recommendations complete

Threat Response Summary:
{
  "threat_level": "severe",
  "detection": {
    "type": "Unknown",
    "timestamp": 1743278783.317631,
    "location": {}
  },
  "analysis": {
    "description": "Based on the detection data, this appears to be a surveillance drone flying at medium altitude (150m) during dusk hours in clear weather.\n\nType of threat: Unauthorized drone surveillance\nIntent: Likely intelligence gathering or area mapping\nDanger level: Medium\nCapabilities: Video/photo recording, possible radio signal interception\nLimitations: Limited flight time, vulnerable to signal jamming\nStrategic implications: Potential preparation for future operations or targeting of critical infrastructure",
    "timestamp": 1743278781.298769
  },
  "response_plan": {
    "steps": [
      "1. Deploy counter-drone measures to track the device",
      "2. Activate electronic countermeasures to jam signals if necessary",
      "3. Alert nearby security units to maintain visual contact",
      "- Signal intelligence unit",
      "- Counter-drone response team",
      "- Radar tracking system",
      "- Maintain secure channel Alpha for all communications",
      "- Hourly situational updates to command",
      "- Alert civilian airspace control if drone moves toward populated areas",
      "- Prepare forced landing protocols if threat escalates",
      "- Ready physical interception units if drone approaches sensitive areas",
      "- Immediate tracking and monitoring",
      "- Escalation decision within 15 minutes",
      "- Resolution within 60 minutes"
    ],
    "timestamp": 1743278782.307945
  },
  "agencies": {
    "NAVY COMMAND": [
      "Maintain alert status for naval assets in the area",
      "Prepare defensive countermeasures",
      "Update intelligence assessment based on drone flight pattern"
    ],
    "COAST GUARD": [
      "Patrol waterways surrounding the detection area",
      "Coordinate with local maritime traffic",
      "Ready response vessels for possible interception"
    ],
    "INTELLIGENCE SERVICES": [
      "Analyze drone technical specifications based on flight characteristics",
      "Cross-reference with known drone deployments in the region",
      "Investigate potential operators based on capabilities"
    ],
    "LOCAL LAW ENFORCEMENT": [
      "Secure perimeter of critical infrastructure in flight path",
      "Prepare for public safety measures if drone moves toward populated areas",
      "Coordinate with federal authorities on jurisdiction"
    ]
  }
}`,
  '2': `Threat Response Summary:
{
  "threat_level": "severe",
  "detection": {
    "type": "Unknown",
    "timestamp": 1743278786.351839,
    "location": {}
  },
  "analysis": {
    "description": "Based on the detection data, this appears to be a surveillance drone flying at medium altitude (150m) during dusk hours in clear weather.\n\nType of threat: Unauthorized drone surveillance\nIntent: Likely intelligence gathering or area mapping\nDanger level: Medium\nCapabilities: Video/photo recording, possible radio signal interception\nLimitations: Limited flight time, vulnerable to signal jamming\nStrategic implications: Potential preparation for future operations or targeting of critical infrastructure",
    "timestamp": 1743278784.333482
  },
  "response_plan": {
    "steps": [
      "1. Deploy counter-drone measures to track the device",
      "2. Activate electronic countermeasures to jam signals if necessary",
      "3. Alert nearby security units to maintain visual contact",
      "- Signal intelligence unit",
      "- Counter-drone response team",
      "- Radar tracking system",
      "- Maintain secure channel Alpha for all communications",
      "- Hourly situational updates to command",
      "- Alert civilian airspace control if drone moves toward populated areas",
      "- Prepare forced landing protocols if threat escalates",
      "- Ready physical interception units if drone approaches sensitive areas",
      "- Immediate tracking and monitoring",
      "- Escalation decision within 15 minutes",
      "- Resolution within 60 minutes"
    ],
    "timestamp": 1743278785.341254
  },
  "agencies": {
    "NAVY COMMAND": [
      "Maintain alert status for naval assets in the area",
      "Prepare defensive countermeasures",
      "Update intelligence assessment based on drone flight pattern"
    ],
    "COAST GUARD": [
      "Patrol waterways surrounding the detection area",
      "Coordinate with local maritime traffic",
      "Ready response vessels for possible interception"
    ],
    "INTELLIGENCE SERVICES": [
      "Analyze drone technical specifications based on flight characteristics",
      "Cross-reference with known drone deployments in the region",
      "Investigate potential operators based on capabilities"
    ],
    "LOCAL LAW ENFORCEMENT": [
      "Secure perimeter of critical infrastructure in flight path",
      "Prepare for public safety measures if drone moves toward populated areas",
      "Coordinate with federal authorities on jurisdiction"
    ]
  }
}`,
  '3': null // Will use same as 1
};

const DronePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detections, setDetections] = useState('');
  const [videoLoading, setVideoLoading] = useState(true);
  
  // Map drone ID to processed video source
  const getProcessedVideoSrc = (droneId) => {
    const sources = {
      '1': '/processed_output/1.mp4',
      '2': '/processed_output/2.mp4',
      '3': '/processed_output/3.mp4',
      '4': '/processed_output/VIDEO-2025-03-29-17-28-58.mp4',
      '5': '/processed_output/VIDEO-2025-03-29-17-41-29.mp4',
      '6': '/processed_output/VIDEO-2025-03-29-17-44-27.mp4'
    };
    return sources[droneId] || '';
  };

  useEffect(() => {
    setLoading(true);
    setDetections('');
    setVideoLoading(true);
    
    if (['1', '2', '3'].includes(id)) {
      setTimeout(() => {
        const data = id === '3' ? mockData['1'] : mockData[id];
        setDetections(data ? formatText(data) : '');
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  return (
    <Box sx={{ 
      backgroundColor: '#0A0A0A', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      p: 2
    }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2
        }}
      >
        <IconButton 
          onClick={() => navigate('/dashboard')}
          sx={{ color: 'white', mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ color: 'white' }}>
          Drone Feed {id} - Analysis
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flex: 1,
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Video Container */}
        <Paper sx={{ 
          flex: 2,
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#000',
          aspectRatio: '16/9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {videoLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <video
            key={getProcessedVideoSrc(id)}
            autoPlay
            loop
            muted
            playsInline
            controls
            onLoadedData={handleVideoLoad}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            <source src={getProcessedVideoSrc(id)} type="video/mp4" />
          </video>
        </Paper>

        {/* Analysis Box */}
        <Paper sx={{ 
          flex: 1,
          p: 2,
          minWidth: { xs: '100%', md: '300px' },
          maxWidth: { md: '400px' },
          overflowY: 'auto',
          maxHeight: { xs: '400px', md: 'calc(100vh - 120px)' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: loading ? 'center' : 'flex-start',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}>
          {loading ? (
            <CircularProgress />
          ) : (
            detections ? (
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                  Detection Results
                </Typography>
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    color: '#10B981',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '0.875rem',
                    margin: 0,
                    width: '100%',
                    lineHeight: '1.5'
                  }}
                >
                  {detections}
                </pre>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                No detection data available
              </Typography>
            )
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default DronePage;

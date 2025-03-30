import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Dialog, CircularProgress } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
  }
  100% {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  }
`;

const VideoFeed = ({ id, threatLevel, videoSrc, location, status }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigate(`/drone/${id}`);
  };

  const handleVideoLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleVideoError = (e) => {
    console.error('Video load error:', e);
    setError(true);
    setLoading(false);
  };

  // Get border glow color based on threat level
  const getGlowColor = (level) => {
    switch (level) {
      case 'HIGH':
        return {
          color: 'rgba(239, 68, 68, 0.8)', // Red
          shadow: '0 0 30px rgba(239, 68, 68, 0.6)'
        };
      case 'MEDIUM':
        return {
          color: 'rgba(245, 158, 11, 0.8)', // Orange
          shadow: '0 0 30px rgba(245, 158, 11, 0.6)'
        };
      case 'LOW':
        return {
          color: 'rgba(16, 185, 129, 0.8)', // Green
          shadow: '0 0 30px rgba(16, 185, 129, 0.6)'
        };
      default:
        return {
          color: 'rgba(147, 51, 234, 0.8)', // Purple
          shadow: '0 0 30px rgba(147, 51, 234, 0.6)'
        };
    }
  };

  // Retry loading video if it fails
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setLoading(true);
        setError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  const glowStyles = getGlowColor(threatLevel);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: '#1A1A1A',
          border: `1px solid ${glowStyles.color}`,
          boxShadow: glowStyles.shadow,
          animation: threatLevel === 'HIGH' ? `${glowPulse} 2s ease-in-out infinite` : 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: `0 0 40px ${glowStyles.color}`,
            '& .video-overlay': {
              opacity: 1
            }
          }
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 2
            }}
          >
            <CircularProgress size={40} sx={{ color: glowStyles.color, mb: 1 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Loading Feed...
            </Typography>
          </Box>
        )}

        {error && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 2
            }}
          >
            <Typography variant="body2" sx={{ color: '#EF4444', mb: 1 }}>
              Feed Error
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {retryCount < 3 ? 'Retrying...' : 'Unable to load feed'}
            </Typography>
          </Box>
        )}
        
        {/* Status Indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: status === 'Active' ? '#10B981' : '#EF4444',
            boxShadow: `0 0 8px ${status === 'Active' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)'}`,
            animation: status === 'Active' ? 'pulse 2s infinite' : 'none',
            zIndex: 3
          }}
        />

        {/* Video Overlay on Hover */}
        <Box
          className="video-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            zIndex: 1
          }}
        >
          <Box
            sx={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
              View Details
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {location}
            </Typography>
            <IconButton onClick={() => setOpen(true)} sx={{ color: 'white', mt: 1 }}>
              <OpenInFullIcon />
            </IconButton>
          </Box>
        </Box>

        <video
          key={`${videoSrc}-${retryCount}`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            zIndex: 1
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <style>
          {`
            @keyframes pulse {
              0% {
                transform: scale(0.95);
                opacity: 0.8;
              }
              50% {
                transform: scale(1.05);
                opacity: 1;
              }
              100% {
                transform: scale(0.95);
                opacity: 0.8;
              }
            }
          `}
        </style>
      </Box>

      {/* Fullscreen dialog */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#0A0A0A',
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            <Typography sx={{ color: 'white' }}>
              Drone {id} - {threatLevel} Threat Level
            </Typography>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ flex: 1, backgroundColor: '#000' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default VideoFeed;

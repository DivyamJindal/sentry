import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, LinearProgress, IconButton, Chip } from '@mui/material';
import VideoFeed from './VideoFeed';
import WarningIcon from '@mui/icons-material/Warning';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SecurityIcon from '@mui/icons-material/Security';
import RadarIcon from '@mui/icons-material/Radar';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeThreats: 3,
    systemStatus: 92,
    networkLatency: 45,
    detectionRate: 98.5,
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Test video sources (unprocessed)
  const drones = [
    { id: 1, threatLevel: 'HIGH', videoSrc: '/test_videos/1.mp4', location: 'Sector A-1', status: 'Active' },
    { id: 2, threatLevel: 'MEDIUM', videoSrc: '/test_videos/2.mp4', location: 'Sector B-2', status: 'Active' },
    { id: 3, threatLevel: 'LOW', videoSrc: '/test_videos/3.mp4', location: 'Sector C-3', status: 'Active' },
    { id: 4, threatLevel: 'HIGH', videoSrc: '/test_videos/VIDEO-2025-03-29-17-28-58.mp4', location: 'Sector D-4', status: 'Active' },
    { id: 5, threatLevel: 'MEDIUM', videoSrc: '/test_videos/VIDEO-2025-03-29-17-41-29.mp4', location: 'Sector E-5', status: 'Active' },
    { id: 6, threatLevel: 'LOW', videoSrc: '/test_videos/VIDEO-2025-03-29-17-44-27.mp4', location: 'Sector F-6', status: 'Active' }
  ];

  // Update stats every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeThreats: Math.floor(Math.random() * 5) + 1,
        systemStatus: Math.min(100, prev.systemStatus + (Math.random() * 2 - 1)),
        networkLatency: Math.max(20, Math.min(100, prev.networkLatency + (Math.random() * 10 - 5))),
        detectionRate: Math.min(100, Math.max(95, prev.detectionRate + (Math.random() * 0.4 - 0.2))),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ p: 3, height: '100vh', backgroundColor: '#121212' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <RadarIcon sx={{ color: '#10B981', fontSize: 32 }} />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 500 }}>
            Live Feed Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Last Update: {stats.lastUpdate}
          </Typography>
          <IconButton sx={{ color: '#10B981' }}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <Paper sx={{ 
            p: 2, 
            bgcolor: 'rgba(0, 0, 0, 0.8)', 
            color: 'white',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SecurityIcon sx={{ color: '#10B981' }} />
              <Typography variant="h6">System Status</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={stats.systemStatus} 
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: stats.systemStatus > 90 ? '#10B981' : 
                            stats.systemStatus > 70 ? '#F59E0B' : '#EF4444'
                  }
                }}
              />
              <Typography variant="body2" sx={{ mt: 0.5, textAlign: 'right' }}>
                {stats.systemStatus.toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            p: 2, 
            bgcolor: 'rgba(0, 0, 0, 0.8)', 
            color: 'white',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon sx={{ color: '#EF4444' }} />
              <Typography variant="h6">Active Threats</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography variant="h3" sx={{ color: '#EF4444' }}>
                {stats.activeThreats}
              </Typography>
              <Chip
                label="ALERT" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(239, 68, 68, 0.2)',
                  color: '#EF4444',
                  animation: stats.activeThreats > 3 ? 'pulse 2s infinite' : 'none'
                }} 
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            p: 2, 
            bgcolor: 'rgba(0, 0, 0, 0.8)', 
            color: 'white',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SignalCellularAltIcon sx={{ color: '#3B82F6' }} />
              <Typography variant="h6">Network Latency</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h3">
                {stats.networkLatency.toFixed(1)}
                <Typography component="span" variant="h6" sx={{ ml: 1, opacity: 0.7 }}>ms</Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            p: 2, 
            bgcolor: 'rgba(0, 0, 0, 0.8)', 
            color: 'white',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RadarIcon sx={{ color: '#10B981' }} />
              <Typography variant="h6">Detection Rate</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h3" sx={{ color: '#10B981' }}>
                {stats.detectionRate.toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Drone Feeds */}
      <Grid container spacing={2}>
        {drones.map((drone) => (
          <Grid item xs={12} md={6} lg={4} key={drone.id}>
            <Paper 
              sx={{ 
                height: 300,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Box sx={{ 
                p: 1, 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle1" sx={{ color: 'white' }}>
                  Drone {drone.id} - {drone.location}
                </Typography>
                <Chip
                  label={drone.threatLevel}
                  size="small"
                  sx={{
                    bgcolor: drone.threatLevel === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' :
                           drone.threatLevel === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' :
                           'rgba(16, 185, 129, 0.2)',
                    color: drone.threatLevel === 'HIGH' ? '#EF4444' :
                          drone.threatLevel === 'MEDIUM' ? '#F59E0B' :
                          '#10B981',
                    borderRadius: '4px'
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
                <VideoFeed {...drone} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </Box>
  );
};

export default Dashboard;

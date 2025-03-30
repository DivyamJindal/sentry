import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import RadarIcon from '@mui/icons-material/Radar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarningIcon from '@mui/icons-material/Warning';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
    box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.8);
  }
  50% {
    transform: translateY(-20px);
    text-shadow: 0 0 40px rgba(147, 51, 234, 1);
  }
  100% {
    transform: translateY(0px);
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.8);
  }
`;

const radar = keyframes`
  0% {
    transform: rotate(0deg);
    opacity: 0.4;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.8;
  }
`;

const holographic = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeThreats: 0,
    detectionRate: 0,
    networkLatency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        activeThreats: Math.floor(Math.random() * 5),
        detectionRate: 95 + Math.floor(Math.random() * 5),
        networkLatency: 15 + Math.floor(Math.random() * 10)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleEnterDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          animation: `${radar} 8s linear infinite`,
          border: '1px solid rgba(147, 51, 234, 0.2)',
          boxShadow: '0 0 60px rgba(147, 51, 234, 0.2)'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <SecurityIcon 
              sx={{ 
                fontSize: 80, 
                color: '#9333EA',
                animation: `${float} 3s ease-in-out infinite`,
                mr: 2,
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.8))'
              }} 
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #9333EA 0%, #C084FC 50%, #9333EA 100%)',
                backgroundSize: '200% 200%',
                animation: `${holographic} 3s ease infinite`,
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
                letterSpacing: '2px'
              }}
            >
              SENTRY
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '800px',
              margin: '0 auto',
              mb: 4,
              textShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
            }}
          >
            Next-Generation Defense Intelligence System
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mb: 8,
            maxWidth: '1200px',
            margin: '0 auto',
            justifyContent: 'center',
            px: 2
          }}
        >
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid rgba(147, 51, 234, 0.3)',
                transition: 'all 0.3s ease-in-out',
                width: '100%',
                maxWidth: '320px',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Active Threats
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#C084FC', textAlign: 'center' }}>
                {stats.activeThreats}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid rgba(147, 51, 234, 0.3)',
                transition: 'all 0.3s ease-in-out',
                width: '100%',
                maxWidth: '320px',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RadarIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Detection Rate
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#C084FC', textAlign: 'center' }}>
                {stats.detectionRate}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: 'rgba(10,10,10,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                border: '1px solid rgba(147, 51, 234, 0.3)',
                transition: 'all 0.3s ease-in-out',
                width: '100%',
                maxWidth: '320px',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnalyticsIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Network Latency
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#C084FC', textAlign: 'center' }}>
                {stats.networkLatency}ms
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 12, mb: 6 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleEnterDashboard}
            sx={{
              px: 8,
              py: 2,
              fontSize: '1.2rem',
              background: 'linear-gradient(45deg, #9333EA 30%, #C084FC 90%)',
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
              borderRadius: '50px',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              '&:hover': {
                background: 'linear-gradient(45deg, #7C3AED 30%, #A855F7 90%)',
                transform: 'scale(1.05)',
                boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)',
                transition: 'all 0.3s ease-in-out'
              }
            }}
          >
            Enter Command Center
          </Button>
        </Box>

        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#9333EA',
            animation: `${pulse} 3s ease-in-out infinite`,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            right: '15%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: '#C084FC',
            animation: `${pulse} 4s ease-in-out infinite`,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)'
          }}
        />
      </Container>
    </Box>
  );
};

export default LandingPage;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, AppBar, Toolbar, Divider, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import RadarIcon from '@mui/icons-material/Radar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WarningIcon from '@mui/icons-material/Warning';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShieldIcon from '@mui/icons-material/Shield';
import SpeedIcon from '@mui/icons-material/Speed';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { keyframes } from '@mui/system';
import { motion } from 'framer-motion';

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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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

  const features = [
    {
      icon: <ShieldIcon sx={{ fontSize: 50, color: '#9333EA' }} />,
      title: 'Advanced Threat Protection',
      description: 'Detect and neutralize threats before they compromise your systems with our AI-driven security engine.'
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 50, color: '#9333EA' }} />,
      title: 'Comprehensive Dashboard',
      description: 'Monitor all your security metrics from one intuitive command center with real-time updates.'
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 50, color: '#9333EA' }} />,
      title: 'Instant Alerts',
      description: 'Receive customizable notifications when suspicious activity is detected across your network.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 50, color: '#9333EA' }} />,
      title: 'Performance Optimization',
      description: 'Our lightweight solution ensures maximum security with minimal impact on your system resources.'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'rgba(10,10,10,0.8)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(147, 51, 234, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ color: '#9333EA', mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ 
                background: 'linear-gradient(45deg, #9333EA 30%, #C084FC 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}>
                SENTRY
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#features" underline="none" sx={{ color: 'white', '&:hover': { color: '#C084FC' } }}>Features</Link>
              <Link href="#about" underline="none" sx={{ color: 'white', '&:hover': { color: '#C084FC' } }}>About</Link>
              <Link href="#contact" underline="none" sx={{ color: 'white', '&:hover': { color: '#C084FC' } }}>Contact</Link>
            </Box>
            
            <Box>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => console.log('Log In clicked')}
                sx={{ 
                  minWidth: '120px',
                  px: 2,
                  py: 1,
                  color: '#C084FC', 
                  borderColor: '#9333EA',
                  mr: 1,
                  '&:hover': { 
                    borderColor: '#C084FC', 
                    background: 'rgba(147, 51, 234, 0.1)'
                  } 
                }}
              >
                Log In
              </Button>
              <Button 
                variant="contained" 
                size="small"
                onClick={() => console.log('Sign Up clicked')}
                sx={{ 
                  minWidth: '120px',
                  px: 2,
                  py: 1,
                  background: 'linear-gradient(45deg, #9333EA 30%, #C084FC 90%)',
                  '&:hover': { 
                    background: 'linear-gradient(45deg, #7C3AED 30%, #A855F7 90%)'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Background Elements */}
      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
          boxShadow: '0 0 60px rgba(147, 51, 234, 0.2)',
          zIndex: 0
        }}
      />

      <Box
        component={motion.div}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(147, 51, 234, 0.1)',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', pt: 12, pb: 6 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 10, pt: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <SecurityIcon 
              sx={{ 
                fontSize: 90, 
                color: '#9333EA',
                animation: `${float} 4s ease-in-out infinite`,
                mr: 2,
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.8))'
              }} 
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #9333EA 0%, #C084FC 50%, #9333EA 100%)',
                  backgroundSize: '200% 200%',
                  animation: `${holographic} 3s ease infinite`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
                  letterSpacing: '2px'
                }}
              >
                SENTRY
              </Typography>
            </motion.div>
          </Box>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '800px',
                margin: '0 auto',
                mb: 5,
                textShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
              }}
            >
              Next-Generation Defense Intelligence System
            </Typography>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.95 }}
          >
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
                  transition: 'all 0.3s ease-in-out'
                }
              }}
            >
              Enter Command Center
            </Button>
          </motion.div>
        </Box>

        {/* Stats Grid */}
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mb: 12,
            maxWidth: '1200px',
            margin: '0 auto',
            justifyContent: 'center',
            px: 2
          }}
        >
          {[
            {
              icon: <WarningIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />,
              label: 'Active Threats',
              value: stats.activeThreats,
              color: '#C084FC'
            },
            {
              icon: <RadarIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />,
              label: 'Detection Rate',
              value: `${stats.detectionRate}%`,
              color: '#C084FC'
            },
            {
              icon: <AnalyticsIcon sx={{ color: '#9333EA', mr: 2, fontSize: 30 }} />,
              label: 'Network Latency',
              value: `${stats.networkLatency}ms`,
              color: '#C084FC'
            }
          ].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
              >
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
                    {item.icon}
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ color: item.color, textAlign: 'center' }}>
                    {item.value}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box id="features" sx={{ mb: 12, pt: 12 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#C084FC', 
                mb: 3,
                background: 'linear-gradient(45deg, #9333EA 0%, #C084FC 50%, #9333EA 100%)',
                backgroundSize: '200% 200%',
                animation: `${holographic} 3s ease infinite`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Core Features
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mx: 'auto', maxWidth: '800px' }}>
              Our platform offers comprehensive security coverage with these powerful capabilities
            </Typography>
          </Box>
          
          <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
            <Grid container spacing={4} justifyContent="center">
              {features.map((feature, idx) => (
                <Grid 
                  key={idx} 
                  item 
                  xs={12} 
                  sm={6} 
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.2, duration: 0.8 }}
                    style={{ width: '100%' }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        background: 'rgba(10,10,10,0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        border: '1px solid rgba(147, 51, 234, 0.3)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)'
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Product Overview Section */}
        <Box id="about" sx={{ textAlign: 'center', mb: 12, px: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#C084FC', 
                mb: 3,
                background: 'linear-gradient(45deg, #9333EA 0%, #C084FC 50%, #9333EA 100%)',
                backgroundSize: '200% 200%',
                animation: `${holographic} 3s ease infinite`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Empowering Secure Environments
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '900px', margin: '0 auto', mb: 4 }}>
              Sentry is a cutting-edge defense intelligence platform that utilizes advanced data analytics,
              real-time threat detection, and AI-driven insights to safeguard your critical infrastructure.
              Our system provides continuous monitoring, proactive alerts, and comprehensive situational awareness
              so you can focus on what matters most. Whether you are a security professional, a government agency,
              or an enterprise, Sentry delivers the tools you need to stay one step ahead of emerging risks.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: '250px',
                  background: 'rgba(10,10,10,0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  border: '1px solid rgba(147, 51, 234, 0.3)'
                }}
              >
                <Typography variant="h4" sx={{ color: '#C084FC', mb: 1 }}>99.9%</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Uptime reliability</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: '250px',
                  background: 'rgba(10,10,10,0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  border: '1px solid rgba(147, 51, 234, 0.3)'
                }}
              >
                <Typography variant="h4" sx={{ color: '#C084FC', mb: 1 }}>24/7</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Continuous monitoring</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  width: '250px',
                  background: 'rgba(10,10,10,0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  border: '1px solid rgba(147, 51, 234, 0.3)'
                }}
              >
                <Typography variant="h4" sx={{ color: '#C084FC', mb: 1 }}>500+</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Threat signatures</Typography>
              </Paper>
            </Box>
          </motion.div>
        </Box>

        {/* Trusted By Section */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
            Trusted by security teams worldwide
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 6, 
            flexWrap: 'wrap',
            opacity: 0.6
          }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Box
                key={item}
                component="div"
                sx={{
                  width: '120px',
                  height: '40px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 3s infinite`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body1" sx={{ color: 'white', letterSpacing: '1px' }}>
                  {['ACME', 'SHIELD', 'CIPHER', 'NEXUS', 'QUANTUM'][item-1]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mb: 12, py: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              background: 'rgba(10,10,10,0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(147, 51, 234, 0.3)',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
              Ready to secure your systems?
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
              Join thousands of organizations that trust Sentry for their security needs
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => console.log('Sign Up clicked')}
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #9333EA 30%, #C084FC 90%)',
                    boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                    borderRadius: '50px',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7C3AED 30%, #A855F7 90%)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  Sign Up Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleEnterDashboard}
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderColor: '#9333EA',
                    color: '#C084FC',
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': {
                      borderColor: '#C084FC',
                      background: 'rgba(147, 51, 234, 0.1)'
                    }
                  }}
                >
                  View Demo
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </Box>

        {/* Footer */}
        <Box id="contact" sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 8, pb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ color: '#9333EA', mr: 1 }} />
                <Typography variant="h6" sx={{ 
                  background: 'linear-gradient(45deg, #9333EA 30%, #C084FC 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold'
                }}>
                  SENTRY
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                Next-generation defense intelligence for modern enterprises. Protecting your digital assets with advanced AI technology.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <GitHubIcon sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }} />
                <TwitterIcon sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }} />
                <LinkedInIcon sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }} />
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Product</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Features</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Pricing</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Integrations</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Updates</Link>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Resources</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Documentation</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Guides</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Support</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>API</Link>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Company</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>About</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Blog</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Careers</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Contact</Link>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Legal</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Terms</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Privacy</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Cookies</Link>
                <Link href="#" underline="hover" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#C084FC' } }}>Licenses</Link>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © 2025 Sentry. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Made with security in mind
            </Typography>
          </Box>
        </Box>

        {/* Floating Elements for Visual Interest */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '5%',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            background: '#9333EA',
            animation: `${pulse} 3s ease-in-out infinite`,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#C084FC',
            animation: `${pulse} 4s ease-in-out infinite`,
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '7%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: '#9333EA',
            animation: `${pulse} 5s ease-in-out infinite`,
            boxShadow: '0 0 15px rgba(147, 51, 234, 0.8)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '45%',
            left: '8%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: '#C084FC',
            animation: `${pulse} 6s ease-in-out infinite`,
            boxShadow: '0 0 15px rgba(147, 51, 234, 0.8)',
            zIndex: 0
          }}
        />
      </Container>
    </Box>
  );
};

export default LandingPage;
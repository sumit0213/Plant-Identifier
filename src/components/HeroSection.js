import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2A2A72, #009FFD, #FF619B)',
        padding: '100px 0',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50px',
          right: '-50px',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: `${float} 8s ease-in-out infinite reverse`,
        }}
      />
      <Container>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            textShadow: '2px 4px 10px rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 2s ease-in-out',
          }}
        >
          Modern Analytics for the Modern World
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            marginBottom: '40px',
            fontFamily: 'Poppins, sans-serif',
            textShadow: '1px 2px 8px rgba(0, 0, 0, 0.3)',
            animation: 'fadeIn 2.5s ease-in-out',
          }}
        >
          Unlock the power of data-driven insights, tailored for a rapidly evolving digital landscape.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: '50px',
            padding: '12px 30px',
            background: 'linear-gradient(45deg, #FF619B, #FFD700)',
            boxShadow: '0px 10px 20px rgba(255, 97, 155, 0.5)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0px 15px 25px rgba(255, 97, 155, 0.7)',
            },
          }}
        >
          We just raised a Series B
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;

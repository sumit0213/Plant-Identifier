import React from 'react';
import { Container, Grid, Typography, Box, IconButton, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';

const FooterSection = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#1A237E', color: '#fff', padding: '40px 20px', marginTop: '40px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Vaultflow
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Your go-to platform for comprehensive data-driven insights and analytics, empowering you to make informed decisions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Button sx={{ color: '#fff' }} onClick={() => navigate('/about')}>About Us</Button></li>
              <li><Button sx={{ color: '#fff' }} onClick={() => navigate('/contact')}>Contact Us</Button></li>
              <li><Button sx={{ color: '#fff' }} onClick={() => navigate('/references')}>References</Button></li>
              <li><Button sx={{ color: '#fff' }} onClick={() => navigate('/donate')}>Donate Us</Button></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Follow Us
            </Typography>
            <Box>
              {[
                { icon: <FacebookIcon />, link: 'https://facebook.com' },
                { icon: <TwitterIcon />, link: 'https://twitter.com' },
                { icon: <LinkedInIcon />, link: 'https://linkedin.com' },
                { icon: <InstagramIcon />, link: 'https://instagram.com' },
              ].map((item, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: '#fff',
                    '&:hover': {
                      color: '#ffcc00',
                      transform: 'scale(1.1)',
                    },
                    transition: 'transform 0.2s',
                  }}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ marginTop: '20px', borderTop: '1px solid #fff', paddingTop: '20px' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            © {new Date().getFullYear()} Vaultflow. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterSection;

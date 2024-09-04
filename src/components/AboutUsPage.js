import React from 'react';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import { Container, Typography, Paper, Grid } from '@mui/material';

const AboutUsPage = () => {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Container maxWidth="lg" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Paper elevation={4} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            Welcome to our company! We are dedicated to providing innovative solutions to help businesses thrive in today's rapidly evolving digital landscape. Our team is composed of industry experts with years of experience in various fields, committed to delivering exceptional results for our clients.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            At our core, we believe in the power of data-driven insights to unlock new opportunities and drive sustainable growth. Our mission is to empower businesses with the tools and knowledge they need to make informed decisions, stay ahead of the competition, and achieve their goals.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            We pride ourselves on our collaborative approach, working closely with our clients to understand their unique challenges and tailor our solutions to meet their specific needs. Whether you're a small startup or a large enterprise, we are here to help you navigate the complexities of the digital world and succeed in your endeavors.
          </Typography>
        </Paper>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#003366', color: 'white' }}>
              <Typography variant="h5" style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" style={{ lineHeight: '1.6' }}>
                To be a global leader in data analytics and digital solutions, empowering businesses with the insights they need to transform and thrive in a connected world.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#003366', color: 'white' }}>
              <Typography variant="h5" style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" style={{ lineHeight: '1.6' }}>
                To deliver innovative, data-driven solutions that enable businesses to unlock their full potential, stay ahead of the curve, and achieve their strategic goals.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <FooterSection />
    </>
  );
};

export default AboutUsPage;

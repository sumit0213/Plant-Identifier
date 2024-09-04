import React from 'react';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import { Container, Typography, Paper, Button } from '@mui/material';

const DonateUsPage = () => {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Container maxWidth="lg" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Paper elevation={4} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Donate Us
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            Your support helps us continue our mission to provide top-quality services and resources to our community. We are incredibly grateful for your generosity and commitment to our cause.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            By donating, you enable us to expand our programs, improve our services, and reach even more people who can benefit from our work. Every contribution, no matter the size, makes a significant impact.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            If you would like to make a donation, please click the button below. Thank you for your support!
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Donate Now
          </Button>
        </Paper>
      </Container>
      <FooterSection />
    </>
  );
};

export default DonateUsPage;

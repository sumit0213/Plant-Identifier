import React from 'react';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import { Container, Typography, Paper } from '@mui/material';

const ReferencesPage = () => {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Container maxWidth="lg" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Paper elevation={4} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            References
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            Below are some of the key references and resources that have informed our work and contributed to the development of our services:
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            1. "Understanding Data Analytics" by John Doe - A comprehensive guide on data analytics techniques and applications.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            2. "Modern Web Development" by Jane Smith - An in-depth look at the latest web development trends and technologies.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            3. "Digital Transformation Strategies" by XYZ Consulting - Insights into successful digital transformation initiatives.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
            4. "Open Source Tools for Data Science" - A collection of the best open-source tools available for data science and machine learning.
          </Typography>
        </Paper>
      </Container>
      <FooterSection />
    </>
  );
};

export default ReferencesPage;

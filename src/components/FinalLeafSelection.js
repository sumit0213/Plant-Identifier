import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import ImageGallery from './ImageGallery';

const FinalLeafSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { finalFilteredData, selectedAttributes = {}, possibleData = [] } = location.state || {}; // Get possibleData from location.state

  useEffect(() => {
    console.log('Selected Attributes:', selectedAttributes);
    console.log('Final Filtered Data:', finalFilteredData);
    console.log('Possible Data:', possibleData); // Logging the possible data
  }, [selectedAttributes, finalFilteredData, possibleData]);

  // Function to handle clicking on a species card
  const handleCardClick = (speciesName) => {
    navigate('/document-view', { state: { speciesName } });
  };

  return (
    <div>
      <NavigationBar />
      <HeroSection />
      {/* <ImageGallery /> */}

      <div style={{ padding: '20px' }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Poppins, sans-serif', color: '#2c3e50' }}
        >
          Final Leaf Selection
        </Typography>

       

        <Grid container spacing={4} justifyContent="center">
          {Object.entries(selectedAttributes).map(([attribute, value], index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper
                elevation={5}
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #FFDEE9 10%, #B5FFFC 100%)',
                  borderRadius: '15px',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                  marginBottom: '10px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'background 0.4s, box-shadow 0.4s, transform 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FBC2EB 10%, #A6C1EE 100%)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: 'center', color: '#2c3e50' }}
                >
                  {attribute}
                </Typography>
                <Typography variant="body2" component="div" sx={{ marginTop: '10px', color: '#333' }}>
                  {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" align="center" gutterBottom>
          Possible Data
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {possibleData.length > 0 ? (
            possibleData.map(([speciesName, details], index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Paper
                  elevation={5}
                  sx={{
                    textAlign: 'center',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #e4f9f4 10%, #c8e6f5 100%)',
                    borderRadius: '15px',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                  onClick={() => handleCardClick(speciesName)} // Make the card clickable
                >
                  <Typography variant="h6">{speciesName}</Typography>
                  <ul>
                    {Object.entries(details).map(([attribute, value], idx) => (
                      <li key={idx}>
                        <strong>{attribute}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>No possible data available</Typography>
          )}
        </Grid>

        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
              color: '#fff',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate('/')}
          >
            Finish
          </Button>
        </Box>
      </div>
      <FooterSection navigate={navigate} />
    </div>
  );
};

export default FinalLeafSelection;

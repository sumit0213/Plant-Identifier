import React, { useState, useMemo } from 'react';
import { Button, Typography, Grid, Paper, Dialog, DialogContent, DialogTitle, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import treeSpeciesData from './treeSpeciesData'; // Import your data
import NavigationBar from './NavigationBar'; // Assuming you have this component
import HeroSection from './HeroSection'; // Assuming you have this component
import FooterSection from './FooterSection'; // Assuming you have this component

const FlowerColour = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filteredData } = location.state || {};
  const [selectedValue, setSelectedValue] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [possibleData, setPossibleData] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const uniqueValues = useMemo(() => {
    const values = [...new Set(filteredData.map(([, details]) => details['Flower colour']))].filter(value => value);
    return values;
  }, [filteredData]);

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    const filteredForNextStep = filteredData.filter(
      ([, details]) => details['Flower colour'] === value
    );
    setCount(filteredForNextStep.length);
  };

  const handleNext = () => {
    if (selectedValue) {
      const filteredForNextStep = filteredData.filter(
        ([, details]) => details['Flower colour'] === selectedValue
      );
      navigate('/final-leaf-selection', { state: { finalFilteredData: filteredForNextStep } });
    } else {
      alert('Please select a Flower Colour.');
    }
  };

  const handleShowPossibleData = () => {
    if (selectedValue) {
      const filteredPossibleData = filteredData.filter(
        ([, details]) => details['Flower colour'] === selectedValue
      );
      setPossibleData(filteredPossibleData);
      setOpen(true);
    } else {
      alert('Please select a Flower Colour first.');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <div style={{ padding: isSmallScreen ? '10px' : '20px' }}>
        <Typography variant={isSmallScreen ? "h5" : "h4"} align="center" gutterBottom>
          Please select Flower Colour
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {uniqueValues && uniqueValues.length > 0 ? (
            uniqueValues.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    textAlign: 'center',
                    padding: isSmallScreen ? '15px' : '20px',
                    background: '#f9f9f9',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    boxShadow: selectedValue === value ? '0 0 10px rgba(0, 123, 255, 0.4)' : '0 0 5px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                    '&:hover': {
                      background: '#e0e0e0',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
                    },
                    border: selectedValue === value ? '2px solid #007bff' : 'none',
                  }}
                  onClick={() => handleValueSelect(value)}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: isSmallScreen ? '1rem' : '1.25rem',
                      color: selectedValue === value ? '#007bff' : '#333',
                    }}
                  >
                    {value}
                  </Typography>
                  {selectedValue === value && (
                    <Typography variant="body2" component="div" sx={{ marginTop: '10px', color: '#007bff' }}>
                      Unique Count: {count}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
              No Flower Colour found.
            </Typography>
          )}
        </Grid>
        <Box
          sx={{
            marginTop: '20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: isSmallScreen ? 'stretch' : 'center',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              background: '#ffffff',
              color: '#007bff',
              borderColor: '#007bff',
              padding: isSmallScreen ? '8px 16px' : '10px 20px',
              fontWeight: 'bold',
              transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
              '&:hover': {
                background: '#007bff',
                color: '#ffffff',
                borderColor: '#0056b3',
                transform: 'scale(1.05)',
              },
              marginBottom: isSmallScreen ? '10px' : '0',
              marginRight: isSmallScreen ? '0' : '10px',
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            sx={{
              background: '#ffffff',
              color: '#28a745',
              borderColor: '#28a745',
              padding: isSmallScreen ? '8px 16px' : '10px 20px',
              fontWeight: 'bold',
              transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
              '&:hover': {
                background: '#28a745',
                color: '#ffffff',
                borderColor: '#218838',
                transform: 'scale(1.05)',
              },
              marginBottom: isSmallScreen ? '10px' : '0',
              marginRight: isSmallScreen ? '0' : '10px',
            }}
            onClick={handleNext}
          >
            Next
          </Button>
          <Button
            variant="outlined"
            sx={{
              background: '#ffffff',
              color: '#ffc107',
              borderColor: '#ffc107',
              padding: isSmallScreen ? '8px 16px' : '10px 20px',
              fontWeight: 'bold',
              transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
              '&:hover': {
                background: '#ffc107',
                color: '#333',
                borderColor: '#e0a800',
                transform: 'scale(1.05)',
              },
            }}
            onClick={handleShowPossibleData}
          >
            Show Possible Data
          </Button>
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Possible Data</DialogTitle>
        <DialogContent>
          {possibleData && possibleData.length > 0 ? (
            possibleData.map(([speciesName, details], index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{speciesName}</Typography>
                <ul>
                  {Object.entries(details).map(([attribute, value], idx) => (
                    <li key={idx}>
                      <strong>{attribute}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </DialogContent>
      </Dialog>
      <FooterSection />
    </div>
  );
};

export default FlowerColour;

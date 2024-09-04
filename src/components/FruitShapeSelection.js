import React, { useState, useMemo } from 'react';
import { Button, Typography, Grid, Card, CardContent, Dialog, DialogContent, DialogTitle, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import treeSpeciesData from './treeSpeciesData';
import NavigationBar from './NavigationBar'; 
import HeroSection from './HeroSection'; 
import FooterSection from './FooterSection';

const FruitShapeSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safeguard for filteredData
  const filteredData = location.state?.filteredData || Object.entries(treeSpeciesData);

  const [selectedValue, setSelectedValue] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [possibleData, setPossibleData] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const uniqueValues = useMemo(() => {
    const values = [...new Set(filteredData.map(([, details]) => details['Fruit shape']))].filter(value => value);
    return values;
  }, [filteredData]);

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    const filteredForNextStep = filteredData.filter(
      ([, details]) => details['Fruit shape'] === value
    );
    setCount(filteredForNextStep.length);
  };

  const handleNext = () => {
    if (selectedValue) {
      const filteredForNextStep = filteredData.filter(
        ([, details]) => details['Fruit shape'] === selectedValue
      );
      navigate('/fruit-colour-selection', { state: { filteredData: filteredForNextStep } });
    } else {
      alert('Please select a Fruit Shape.');
    }
  };

  const handleShowPossibleData = () => {
    if (selectedValue) {
      const filteredPossibleData = filteredData.filter(
        ([, details]) => details['Fruit shape'] === selectedValue
      );
      setPossibleData(filteredPossibleData);
      setOpen(true);
    } else {
      alert('Please select a Fruit Shape first.');
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
          Please select Fruit Shape
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
          {uniqueValues && uniqueValues.length > 0 ? (
            uniqueValues.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: selectedValue === value ? '2px solid #007bff' : '1px solid #ccc',
                    boxShadow: selectedValue === value ? '0 0 10px rgba(0, 123, 255, 0.4)' : 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                    '&:hover': {
                      background: '#e0e0e0',
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
                    },
                  }}
                  onClick={() => handleValueSelect(value)}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
                      {value}
                    </Typography>
                    {selectedValue === value && (
                      <Typography variant="body2" component="div" sx={{ marginTop: '10px', color: '#007bff' }}>
                        Unique Count: {count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
              No Fruit Shape found.
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
      </div>
      
      <FooterSection />
    </div>
  );
};

export default FruitShapeSelection;

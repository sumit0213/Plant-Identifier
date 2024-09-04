import React, { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const LeafShapeSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filteredData } = location.state || [];
  const [selectedLeafShape, setSelectedLeafShape] = useState(null);
  const [count, setCount] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const uniqueLeafShapes = [...new Set(filteredData.map(([, details]) => details['Leaf shape']))];

  const handleLeafShapeSelect = (leafShape) => {
    setSelectedLeafShape(leafShape);
    const finalFilteredData = filteredData.filter(
      ([, details]) => details['Leaf shape'] === leafShape
    );
    setCount(finalFilteredData.length);
  };

  const handleNext = () => {
    if (selectedLeafShape) {
      const finalFilteredData = filteredData.filter(
        ([, details]) => details['Leaf shape'] === selectedLeafShape
      );
      navigate('/leaf-colour-selection', { state: { finalFilteredData } });
    } else {
      alert('Please select a Leaf Shape.');
    }
  };

  return (
    <div style={{ padding: isSmallScreen ? '10px' : '20px' }}>
      <Typography variant={isSmallScreen ? "h5" : "h4"} align="center" gutterBottom>
        Please select Leaf Shape
      </Typography>
      <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
        {uniqueLeafShapes.map((leafShape, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                borderRadius: '10px',
                border: selectedLeafShape === leafShape ? '2px solid #007bff' : '1px solid #ccc',
                boxShadow: selectedLeafShape === leafShape ? '0 0 10px rgba(0, 123, 255, 0.4)' : 'none',
                transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                '&:hover': {
                  background: '#e0e0e0',
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
                },
              }}
              onClick={() => handleLeafShapeSelect(leafShape)}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
                  {leafShape}
                </Typography>
                {selectedLeafShape === leafShape && (
                  <Typography variant="body2" component="div" sx={{ marginTop: '10px', color: '#007bff' }}>
                    Unique Count: {count}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
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
      </Box>
    </div>
  );
};

export default LeafShapeSelection;

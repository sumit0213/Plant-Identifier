import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, Card, CardContent, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import treeSpeciesData from './treeSpeciesData'; // Ensure this is correctly imported

const LeafArrangementSelection = () => {
  const navigate = useNavigate();
  const [uniqueLeafArrangements, setUniqueLeafArrangements] = useState([]);
  const [selectedArrangement, setSelectedArrangement] = useState(null);
  const [count, setCount] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to get the value for "Leaf Arrangement" even if the key is inconsistent
  const getLeafArrangement = (details) => {
    return (
      details['Leaf Arrangement'] ||
      details['Leaf Arrangement2'] ||
      details['Leaf Arrangement3'] ||
      null
    );
  };

  // Extract unique "Leaf Arrangement" values from the entire dataset
  useEffect(() => {
    const arrangements = [
      ...new Set(
        Object.values(treeSpeciesData)
          .map(details => getLeafArrangement(details))
          .filter(arrangement => arrangement) // Filter out any undefined/null values
      ),
    ];
    setUniqueLeafArrangements(arrangements);
  }, []);

  const handleArrangementSelect = (arrangement) => {
    setSelectedArrangement(arrangement);
    const filteredData = Object.entries(treeSpeciesData).filter(
      ([, details]) => getLeafArrangement(details) === arrangement
    );
    setCount(filteredData.length);
  };

  const handleNext = () => {
    if (selectedArrangement) {
      const filteredData = Object.entries(treeSpeciesData).filter(
        ([, details]) => getLeafArrangement(details) === selectedArrangement
      );
      navigate('/next-leaf-selection', { state: { filteredData } }); // Adjust the route as necessary
    } else {
      alert('Please select a Leaf Arrangement.');
    }
  };

  return (
    <div style={{ padding: isSmallScreen ? '10px' : '20px' }}>
      <Typography
        variant={isSmallScreen ? "h5" : "h3"}
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Arial Black', Gadget, sans-serif",
          fontWeight: 'bold',
          color: '#000',
          textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        Please select your Leaf Arrangement
      </Typography>
      <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
        {uniqueLeafArrangements.length > 0 ? (
          uniqueLeafArrangements.map((arrangement, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  textAlign: 'center',
                  background: selectedArrangement === arrangement
                    ? 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)'
                    : 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)',
                  cursor: 'pointer',
                  borderRadius: '15px',
                  border: selectedArrangement === arrangement ? '2px solid #2ecc71' : '1px solid #ccc',
                  boxShadow: selectedArrangement === arrangement
                    ? '0 12px 25px rgba(0, 0, 0, 0.3)'
                    : '0 8px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s, background 0.3s',
                  transform: selectedArrangement === arrangement ? 'scale(1.05)' : 'scale(1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #a4d4e8 10%, #c0e7e1 100%)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                }}
                onClick={() => handleArrangementSelect(arrangement)}
              >
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: isSmallScreen ? '1rem' : '1.25rem' }}>
                    {arrangement}
                  </Typography>
                  {selectedArrangement === arrangement && (
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
            No Leaf Arrangement found.
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
          variant="contained"
          sx={{
            background: '#f0f0f0', // Light standard color
            color: '#333', // Darker text color for contrast
            padding: isSmallScreen ? '8px 16px' : '10px 20px',
            fontWeight: 'bold',
            transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
            '&:hover': {
              background: '#d9d9d9', // Slightly darker on hover
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
          variant="contained"
          sx={{
            background: '#f0f0f0', // Light standard color
            color: '#333', // Darker text color for contrast
            padding: isSmallScreen ? '8px 16px' : '10px 20px',
            fontWeight: 'bold',
            transition: 'transform 0.3s, border-color 0.3s, color 0.3s',
            '&:hover': {
              background: '#d9d9d9', // Slightly darker on hover
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

export default LeafArrangementSelection;

import React, { useState } from 'react';
import { Button, Typography, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import treeSpeciesData from './treeSpeciesData';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import MagnifyImage from './MagnifyImage'; // Importing the new MagnifyImage component

// Correctly importing images
import LeafSimpleImage from '../Asset/LeafSimple.png';
import LeafCompoundImage from '../Asset/LeafCompound.png';

const LeafTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedLeafType, setSelectedLeafType] = useState(null);
  const [magnifySrc, setMagnifySrc] = useState(null); // State for magnifying image

  const leafTypes = [
    { type: 'Leaf (Simple)', image: LeafSimpleImage },
    { type: 'Leaf (Compound)', image: LeafCompoundImage }
  ];

  const handleLeafTypeSelect = (leafType) => {
    setSelectedLeafType(leafType);
    console.log(`Selected Leaf Type: ${leafType}`);
  };

  const handleNext = () => {
    if (selectedLeafType) {
      const filteredData = Object.entries(treeSpeciesData).filter(
        ([, details]) => details['Leaf Type'] === selectedLeafType
      );
      console.log('Filtered Data:', filteredData);
      navigate('/leaf-attributes-selection', { state: { filteredData, selectedLeafType } });
    } else {
      alert('Please select a Leaf Type.');
    }
  };

  const handleImageDoubleClick = (src) => {
    setMagnifySrc(src); // Set the source for magnifying
  };

  const closeMagnifyView = () => {
    setMagnifySrc(null); // Close magnified view
  };

  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <div style={{ padding: '20px' }}>
        <Typography
          variant="h3" // Increased the font size for a bold header
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Arial Black', Gadget, sans-serif", // Font similar to the image
            fontWeight: 'bold',
            color: '#000', // Black color for the text
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)', // Light shadow for emphasis
          }}
        >
          Please select Leaf Type
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {leafTypes.map((leafTypeObj, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} display="flex" justifyContent="center">
              <Paper
                elevation={5}
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  background: selectedLeafType === leafTypeObj.type
                    ? 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)' // Light gradient background on selection
                    : 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)',
                  cursor: 'pointer',
                  borderRadius: '15px',
                  boxShadow: selectedLeafType === leafTypeObj.type
                    ? '0 12px 25px rgba(0, 0, 0, 0.3)'
                    : '0 8px 15px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #a4d4e8 10%, #c0e7e1 100%)', // Darker gradient on hover
                    color: '#fff',
                    transform: 'scale(1.05)', // Scale up slightly on hover
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'transform 0.3s, background 0.4s, box-shadow 0.4s',
                  border: selectedLeafType === leafTypeObj.type ? '3px solid #2ecc71' : 'none', // Sea green border
                  width: '250px',  // Fixed width
                  height: '350px', // Fixed height
                  transform: selectedLeafType === leafTypeObj.type ? 'scale(1.05)' : 'scale(1)', // In and out effect on selection
                }}
                onClick={() => handleLeafTypeSelect(leafTypeObj.type)}
              >
                <img 
                  src={leafTypeObj.image} 
                  alt={leafTypeObj.type} 
                  style={{ 
                    width: '100%', 
                    height: '180px',  // Adjusted height for the image
                    borderRadius: '10px', 
                    marginBottom: '15px' 
                  }}
                  onDoubleClick={() => handleImageDoubleClick(leafTypeObj.image)} // Handle double click
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#333',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  {leafTypeObj.type}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#333',
                    fontSize: '0.9rem',
                    marginTop: '10px',
                  }}
                >
                  I am putting myself to the fullest possible use, which is all I think any conscious entity can ever hope to do.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              background: '#f0f0f0', // Light standard color
              color: '#333', // Darker text color for contrast
              padding: '10px 20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                background: '#d9d9d9', // Slightly darker on hover
                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                transform: 'scale(1.05)',
              },
              marginRight: '10px',
            }}
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
          <Button
            variant="contained"
            sx={{
              background: '#f0f0f0', // Light standard color
              color: '#333', // Darker text color for contrast
              padding: '10px 20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                background: '#d9d9d9', // Slightly darker on hover
                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                transform: 'scale(1.05)',
              },
            }}
            onClick={handleNext}
          >
            NEXT
          </Button>
        </Box>
      </div>
      {magnifySrc && <MagnifyImage src={magnifySrc} onClose={closeMagnifyView} />}
      <FooterSection navigate={navigate} />
    </div>
  );
};

export default LeafTypeSelection;

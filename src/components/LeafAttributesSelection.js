import React, { useState, useMemo } from 'react';
import { Button, Typography, Grid, Paper, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Import all leaf images
import AttenuateImage from '../Asset/Leaf/Attenuate.png';
import CuneateImage from '../Asset/Leaf/Cuneate.png';
import ObliqueImage from '../Asset/Leaf/Oblique.png';
import RoundedImage from '../Asset/Leaf/Rounded.png';
import SagittateImage from '../Asset/Leaf/Sagittate.png';
import PlaceholderImage from '../Asset/leaf-placeholder.png'; // Placeholder image

const LeafAttributesSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { filteredData, currentAttributeIndex = 0, selectedLeafType, selectedAttributes = {} } = location.state || {};
  const [selectedValue, setSelectedValue] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [possibleData, setPossibleData] = useState([]);

  const attributes = selectedLeafType === 'Leaf (Simple)' 
    ? [
        { label: 'Leaf Arrangement', key: 'Leaf Arrangement' },
        { label: 'Leaf Shape', key: 'Leaf shape' },
        { label: 'Leaf Apex', key: 'Leaf apex' },
        { label: 'Leaf Margin', key: 'leaf margin' },
        { label: 'Leaf Base', key: 'leaf base' },
        { label: 'Leaf Surface', key: 'Leaf surface' },
      ]
    : [
        { label: 'Leaf Arrangement', key: 'Leaf Arrangement2' },
        { label: 'Leaf Shape', key: 'Leaf shape3' },
        { label: 'Leaf Apex', key: 'Leaf apex4' },
        { label: 'Leaf Margin', key: 'leaf margin5' },
        { label: 'Leaf Base', key: 'leaf base6' },
        { label: 'Leaf Surface', key: 'Leaf surface7' },
      ];

  const currentAttribute = attributes[currentAttributeIndex];

  const imageMap = {
    'Attenuate': AttenuateImage,
    'Cuneate': CuneateImage,
    'Oblique': ObliqueImage,
    'Rounded': RoundedImage,
    'Sagittate': SagittateImage,
  };

  const uniqueValues = useMemo(() => {
    if (filteredData) {
      const values = [...new Set(filteredData.map(([, details]) => details[currentAttribute.key]))].filter(value => value);
      return values;
    }
    return [];
  }, [currentAttribute, filteredData]);

  const handleValueSelect = (value) => {
    setSelectedValue(value);
    const filteredForNextStep = filteredData.filter(
      ([, details]) => details[currentAttribute.key] === value
    );
    setCount(filteredForNextStep.length);
  };

  const handleNext = () => {
    if (selectedValue) {
      const filteredForNextStep = filteredData.filter(
        ([, details]) => details[currentAttribute.key] === selectedValue
      );

      const updatedSelectedAttributes = {
        ...selectedAttributes,
        [currentAttribute.label]: selectedValue,
      };

      if (currentAttributeIndex < attributes.length - 1) {
        navigate('/leaf-attributes-selection', { 
          state: { 
            filteredData: filteredForNextStep, 
            currentAttributeIndex: currentAttributeIndex + 1, 
            selectedLeafType, 
            selectedAttributes: updatedSelectedAttributes 
          } 
        });
      } else {
        navigate('/final-leaf-selection', { 
          state: { 
            finalFilteredData: filteredForNextStep, 
            selectedAttributes: updatedSelectedAttributes,
            possibleData // Pass possibleData to FinalLeafSelection
          } 
        });
      }
    } else {
      alert(`Please select your ${currentAttribute.label}.`);
    }
  };

  const handleShowPossibleData = () => {
    if (selectedValue) {
      const filteredPossibleData = filteredData.filter(
        ([, details]) => details[currentAttribute.key] === selectedValue
      );
      setPossibleData(filteredPossibleData);
      setOpen(true);
    } else {
      alert(`Please select a ${currentAttribute.label} first.`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <div style={{ padding: '20px' }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Arial Black', Gadget, sans-serif",
            fontWeight: 'bold',
            color: '#000',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          Please select your {currentAttribute.label}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {uniqueValues && uniqueValues.length > 0 ? (
            uniqueValues.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Paper
                  elevation={5}
                  sx={{
                    textAlign: 'center',
                    padding: '20px',
                    background: selectedValue === value
                      ? 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)'
                      : 'linear-gradient(135deg, #c8e6f5 10%, #e4f9f4 100%)',
                    cursor: 'pointer',
                    borderRadius: '15px',
                    border: selectedValue === value ? '2px solid #2ecc71' : '1px solid #ccc',
                    boxShadow: selectedValue === value
                      ? '0 12px 25px rgba(0, 0, 0, 0.3)'
                      : '0 8px 15px rgba(0, 0, 0, 0.2)',
                    transform: selectedValue === value ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s, background 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #a4d4e8 10%, #c0e7e1 100%)',
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                    },
                    width: '280px', // Fixed width
                    height: '230px', // Fixed height
                  }}
                  onClick={() => handleValueSelect(value)}
                >
                  <img 
                    src={imageMap[value] || PlaceholderImage} // Use the image if available, otherwise placeholder
                    alt={value} 
                    style={{ 
                      width: '100%', 
                      height: '150px',  // Adjusted height for the image
                      objectFit: 'cover', // Ensures image covers the area
                      borderRadius: '10px', 
                      marginBottom: '15px' 
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
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
              No {currentAttribute.label} found.
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
            alignItems: 'center',
            '& > *': {
              marginBottom: isSmallScreen ? '10px' : '0',
              marginRight: '10px', // Add some space between buttons
              '&:last-child': {
                marginRight: '0', // Remove margin from the last button
              },
            },
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            NEXT
          </Button>
          <Button
            variant="contained"
            onClick={handleShowPossibleData}
          >
            SHOW POSSIBLE DATA
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
      <FooterSection navigate={navigate} />
    </div>
  );
};

export default LeafAttributesSelection;

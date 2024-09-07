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
  const [possibleData, setPossibleData] = useState([]); // State for possible data

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
      // Filter possible data and set it
      const filteredForNextStep = filteredData.filter(
        ([, details]) => details[currentAttribute.key] === selectedValue
      );

      const updatedSelectedAttributes = {
        ...selectedAttributes,
        [currentAttribute.label]: selectedValue,
      };

      const filteredPossibleData = filteredData.filter(
        ([, details]) => details[currentAttribute.key] === selectedValue
      );
      setPossibleData(filteredPossibleData); // Set the possible data

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
        // Pass possibleData to FinalLeafSelection
        navigate('/final-leaf-selection', { 
          state: { 
            finalFilteredData: filteredForNextStep, 
            selectedAttributes: updatedSelectedAttributes,
            possibleData: filteredPossibleData // Pass this data to the next page
          } 
        });
      }
    } else {
      alert(`Please select your ${currentAttribute.label}.`);
    }
  };

  const handleShowPossibleData = () => {
    if (selectedValue) {
      // Filter possible data for the current step
      const filteredPossibleData = filteredData.filter(
        ([, details]) => details[currentAttribute.key] === selectedValue
      );
      setPossibleData(filteredPossibleData); // Set the possible data
      setOpen(true); // Open the dialog to show possible data
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
            fontFamily: "sans-serif",
            fontWeight: 'bold',
            color: '#000',
            //textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            marginTop: '95PX',
          }}
        >
          Please select your {currentAttribute.label}
          <h2
          style={{
            color: 'black',
            fontSize: '24px',
            fontWeight: 'normal',
            marginBottom: '0px',
            align: "center",
          }}
        >
          "various plant images, essential for research and species identification, as part of our botanical study collection."
        </h2>
        </Typography>
        

        <Grid container spacing={6} sx={{padding: '130px',marginTop: '-85 px',}} justifyContent="center">
          {uniqueValues && uniqueValues.length > 0 ? (
            uniqueValues.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} md={3} sx={{width: '100px',}}>
                <Paper
                  elevation={5}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 0,
                    background: '#fff',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: '1.25px solid #B2F8DA', 
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'box-shadow 0.3s',
                  }}
                  onClick={() => handleValueSelect(value)}
                >
                  <img 
                    src={imageMap[value] || PlaceholderImage} // Use the image if available, otherwise placeholder
                    alt={value} 
                    style={{
                      width: '70%',
                      height: '200px', // Set a fixed height for images
                      objectFit: 'cover',
                      borderRadius: '10px 10px 0 0',
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
                      textAlign: 'center', // Center-aligned text
                      padding: '30px', // Added padding
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
              marginRight: '40px', // Add some space between buttons
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
            onClick={handleShowPossibleData} // Show possible data dialog
          >
            SHOW POSSIBLE DATA
          </Button>
        </Box>
        {/* Dialog for showing possible data */}
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

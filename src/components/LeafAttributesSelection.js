import React, { useState, useMemo } from 'react';
import { Button, Typography, Grid, Paper, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StyledCard from './StyledCard'; // Import the StyledCard component
import { alpha } from '@mui/material/styles'; // Import alpha utility for lighter colors

// Import all leaf images
import AttenuateImage from '../Asset/Leaf/Attenuate.png';
import CuneateImage from '../Asset/Leaf/Cuneate.png';
import ObliqueImage from '../Asset/Leaf/Oblique.png';
import RoundedImage from '../Asset/Leaf/Rounded.png';
import SagittateImage from '../Asset/Leaf/Sagittate.png';
import PlaceholderImage from '../Asset/leaf-placeholder.png'; // Placeholder image
import AlternateImage from '../Asset/Leaf/Alternate.png';
import OppositeImage from '../Asset/Leaf/Opposite.png';
import WhorlImage from '../Asset/Leaf/Whorl.png';


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
    'Alternate': AlternateImage,
    'Opposite': OppositeImage,
    'Whorl': WhorlImage,

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
            marginTop: '95px',
          }}
        >
          Please select your {currentAttribute.label}
        </Typography>

        <Grid container spacing={4} sx={{ padding: isSmallScreen ? '30px' : '80px' }} justifyContent="center">
          {uniqueValues && uniqueValues.length > 0 ? (
            uniqueValues.map((value, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <StyledCard
                  title={value}
                  description={`Select ${value} as your ${currentAttribute.label}`}
                  image={imageMap[value] || PlaceholderImage}
                  count={count} // Pass the unique count to the card
                  selected={selectedValue === value} // Highlight if selected
                  onClick={() => handleValueSelect(value)}
                />
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
    gap: '20px', // Add space between buttons
  }}
>
  <Button
    variant="outlined"
    onClick={() => navigate(-1)}
    sx={{
      color: '#4caf50', // Green color for text
      backgroundColor: 'transparent', // Transparent initial background
      border: '2px solid #4caf50', // Green border
      padding: isSmallScreen ? '10px 20px' : '15px 40px', // Adjust padding for responsiveness
      fontSize: isSmallScreen ? '14px' : '16px',
      fontWeight: 'bold',
      borderRadius: '25px', // Rounded button
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for depth
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha('#4caf50', 0.15), // Lighter green on hover
        color: '#4caf50', // Keep green text on hover
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Increased shadow on hover
      },
    }}
  >
    BACK
  </Button>

  <Button
    variant="outlined"
    onClick={handleNext}
    disabled={!selectedValue}
    sx={{
      color: '#2196f3', // Blue color for text
      backgroundColor: 'transparent', // Transparent initial background
      border: '2px solid #2196f3', // Blue border
      padding: isSmallScreen ? '10px 20px' : '15px 40px', // Adjust padding for responsiveness
      fontSize: isSmallScreen ? '14px' : '16px',
      fontWeight: 'bold',
      borderRadius: '25px', // Rounded button
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for depth
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha('#2196f3', 0.15), // Lighter blue on hover
        color: '#2196f3', // Keep blue text on hover
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Increased shadow on hover
      },
      '&:disabled': {
        color: '#ccc', // Disabled text color
        borderColor: '#ccc', // Disabled border color
        boxShadow: 'none',
      },
    }}
  >
    NEXT
  </Button>

  <Button
    variant="outlined"
    onClick={handleShowPossibleData}
    sx={{
      color: '#ff5722', // Orange color for text
      backgroundColor: 'transparent', // Transparent initial background
      border: '2px solid #ff5722', // Orange border
      padding: isSmallScreen ? '10px 20px' : '15px 40px', // Adjust padding for responsiveness
      fontSize: isSmallScreen ? '14px' : '16px',
      fontWeight: 'bold',
      borderRadius: '25px', // Rounded button
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for depth
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: alpha('#ff5722', 0.15), // Lighter orange on hover
        color: '#ff5722', // Keep orange text on hover
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Increased shadow on hover
      },
    }}
  >
    SHOW POSSIBLE DATA
  </Button>
</Box>

        {/* Dialog for showing possible data */}
        <Dialog
  open={open}
  onClose={handleClose}
  maxWidth="md"
  fullWidth
  sx={{
    '& .MuiPaper-root': {
      borderRadius: '12px', // Slightly rounded corners
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for formal look
      backgroundColor: '#f9f9f9', // Light gray background
      padding: '20px',
    },
  }}
>
  <DialogTitle
    sx={{
      fontSize: '22px',
      fontWeight: '600',
      textAlign: 'center', // Centered title
      fontFamily: 'Poppins, sans-serif',
      color: '#333', // Darker color for a formal title
      borderBottom: '1px solid #e0e0e0', // Light separator
      paddingBottom: '10px',
    }}
  >
    Possible Data
  </DialogTitle>
  <DialogContent sx={{ paddingTop: '20px' }}>
    {possibleData && possibleData.length > 0 ? (
      possibleData.map(([speciesName, details], index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: '#fff', // White background for each data block
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', // Subtle shadow for each block
            border: '1px solid #e0e0e0', // Light border for definition
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              color: '#0056b3', // Formal blue color for species name
              marginBottom: '10px',
            }}
          >
            {speciesName}
          </Typography>
          <hr
            style={{
              border: 'none',
              borderBottom: '1px solid #e0e0e0', // Light separator line
              marginBottom: '15px',
            }}
          />
          <ul style={{ paddingLeft: '20px', listStyleType: 'none' }}>
            {Object.entries(details).map(([attribute, value], idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#333', // Darker color for readability
                  fontSize: '15px',
                  lineHeight: '1.6',
                }}
              >
                <strong style={{ color: '#292868' }}>{attribute}:</strong>{' '}
                {value}
              </li>
            ))}
          </ul>
        </Box>
      ))
    ) : (
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          color: '#999', // Light gray for "no data" state
          textAlign: 'center',
        }}
      >
        No data available
      </Typography>
    )}
  </DialogContent>
</Dialog>

      </div>
      <FooterSection navigate={navigate} />
    </div>
  );
};

export default LeafAttributesSelection;

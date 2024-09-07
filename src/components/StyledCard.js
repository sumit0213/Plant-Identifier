import React from 'react';
import { Paper, Typography } from '@mui/material';

const StyledCard = ({ title, description, image, onClick, selected, count }) => {
  return (
    <Paper
      elevation={selected ? 10 : 3} // Elevate card when selected
      sx={{
        width: '250px', // Set a fixed width for the card
        height: '380px', // Set a fixed height for the card (increase to fit the unique count)
        borderRadius: '15px',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'transform 0.3s ease-in-out',
        border: selected ? '3px solid #4caf50' : '1px solid #ddd', // Border changes on selection
        '&:hover': {
          transform: 'scale(1.05)',
        },
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '200px', // Set a fixed height for the image area
          objectFit: 'contain', // Ensure the entire image is visible within the area
        }}
      />
      <div>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            padding: '10px 0',
            fontFamily: 'Poppins, sans-serif',
            color: '#333',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            padding: '10px',
            color: '#555',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {description}
        </Typography>
        {/* Show the unique count only if the card is selected */}
        {selected && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: selected ? '#4caf50' : '#777',
              marginBottom: '10px',
            }}
          >
            Unique Count: {count}
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default StyledCard;

import React, { useState } from 'react';
import { Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlowerSelection = () => {
  const navigate = useNavigate();
  const [selectedArrangement, setSelectedArrangement] = useState('');
  const [selectedColour, setSelectedColour] = useState('');

  const handleArrangementChange = (event) => {
    setSelectedArrangement(event.target.value);
  };

  const handleColourChange = (event) => {
    setSelectedColour(event.target.value);
  };

  const handleNextArrangement = () => {
    if (selectedArrangement) {
      navigate('/flower-arrangement', { state: { selectedArrangement } });
    } else {
      alert("Please select a Flower arrangement.");
    }
  };

  const handleNextColour = () => {
    if (selectedColour) {
      navigate('/flower-colour', { state: { selectedColour } });
    } else {
      alert("Please select a Flower colour.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Flower
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Flower arrangement</InputLabel>
            <Select
              value={selectedArrangement}
              onChange={handleArrangementChange}
              label="Flower arrangement"
            >
              {/* Replace these with actual options from your data */}
              <MenuItem value="Clustered">Clustered</MenuItem>
              <MenuItem value="Solitary">Solitary</MenuItem>
              <MenuItem value="Pairs">Pairs</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Flower colour</InputLabel>
            <Select
              value={selectedColour}
              onChange={handleColourChange}
              label="Flower colour"
            >
              {/* Replace these with actual options from your data */}
              <MenuItem value="Yellow">Yellow</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="White">White</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" onClick={handleNextArrangement}>
          Next (Arrangement)
        </Button>
        <Button variant="contained" color="primary" onClick={handleNextColour}>
          Next (Colour)
        </Button>
      </div>
    </div>
  );
};

export default FlowerSelection;

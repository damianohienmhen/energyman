import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(0.5); // Set an initial value within the range (0-1)
  const [responseMessage, setResponseMessage] = React.useState(null); // Store API response

  // Function to update the energy_factor in the database
  const updateEnergyFactor = async (newValue) => {
    try {
      const response = await fetch('http://localhost:4000/update-energy-factor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ energy_factor: newValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to update energy factor');
      }

      const data = await response.json(); // Parse JSON response
      setResponseMessage(data.message || 'Energy factor updated successfully'); // Store success message

      // Automatically hide the response message after 3 seconds
      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);

      console.log('Energy factor updated successfully:', data);
    } catch (error) {
      console.error('Error updating energy factor:', error);
      setResponseMessage('Failed to update energy factor');

      // Hide error message after 3 seconds
      setTimeout(() => {
        setResponseMessage(null);
      }, 3000);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    updateEnergyFactor(newValue); // Call API on slider change
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value);
    setValue(newValue);
    updateEnergyFactor(newValue); // Call API on input change
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      updateEnergyFactor(0);
    } else if (value > 1) {
      setValue(1);
      updateEnergyFactor(1);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Energy Sold Ratio
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item>
          <TipsAndUpdatesIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            min={0} // Set the minimum value
            max={1} // Set the maximum value
            step={0.01} // Optional: Increase slider precision
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 1,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

      {/* Display the API Response and auto-hide it after 3 seconds */}
      {responseMessage && (
        <Box sx={{ mt: 2, p: 1, bgcolor: '#f0f0f0', borderRadius: '4px', textAlign: 'center' }}>
          <Typography variant="body2">
            {responseMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

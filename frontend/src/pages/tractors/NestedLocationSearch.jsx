import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Card,
  TextField,
  Autocomplete,
  Button,
  Slider
} from '@mui/material';

const NestedLocationSearch = ({ state }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({
    state: state,
    city: '',
    district: '',
    tehsil: '',
    kmRange: [0, 100]
  });

  const steps = ['State', 'City', 'District', 'Tehsil', 'Range'];

  const handleLocationSelect = (type, value) => {
    setSelectedLocation(prev => ({
      ...prev,
      [type]: value
    }));
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleRangeChange = (event, newValue) => {
    setSelectedLocation(prev => ({
      ...prev,
      kmRange: newValue
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Grid container spacing={2}>
            {/* State selection UI */}
          </Grid>
        )}

        {activeStep === 1 && (
          <Autocomplete
            options={state.cities}
            renderInput={(params) => (
              <TextField {...params} label="Select City" />
            )}
            onChange={(_, value) => handleLocationSelect('city', value)}
          />
        )}

        {activeStep === 2 && (
          <Autocomplete
            options={state.districts}
            renderInput={(params) => (
              <TextField {...params} label="Select District" />
            )}
            onChange={(_, value) => handleLocationSelect('district', value)}
          />
        )}

        {activeStep === 3 && (
          <TextField
            fullWidth
            label="Enter Tehsil"
            onChange={(e) => handleLocationSelect('tehsil', e.target.value)}
          />
        )}

        {activeStep === 4 && (
          <Box sx={{ px: 3 }}>
            <Typography gutterBottom>
              Select Distance Range (km)
            </Typography>
            <Slider
              value={selectedLocation.kmRange}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('Search with:', selectedLocation)}
        >
          Search Tractors
        </Button>
      </Box>
    </Box>
  );
};

export default NestedLocationSearch;
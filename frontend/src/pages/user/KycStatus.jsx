import React from 'react';
import { Paper, Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { Security } from '@mui/icons-material';

const KycStatus = ({ status }) => {
  const steps = ['Upload Documents', 'Verification', 'Completed'];
  const activeStep = status === 'pending' ? 1 : status === 'completed' ? 2 : 0;

  return (
    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Security sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6">KYC Status</Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          disabled={status === 'completed'}
        >
          {status === 'completed' ? 'Verified' : 'Complete KYC'}
        </Button>
      </Box>
    </Paper>
  );
};

export default KycStatus;
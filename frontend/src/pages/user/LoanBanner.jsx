import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

const LoanBanner = () => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: '#f8f9fa',
        border: '1px dashed #0098DB',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AccountBalance sx={{ color: '#0098DB', mr: 1 }} />
        <Typography variant="h6" color="primary">
          Hassle Free Loans
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#0098DB',
          '&:hover': {
            bgcolor: '#0087c4',
          },
        }}
      >
        Apply Loan
      </Button>
    </Paper>
  );
};

export default LoanBanner;
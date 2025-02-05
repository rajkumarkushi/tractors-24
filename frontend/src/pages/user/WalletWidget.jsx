import React from 'react';
import { Paper, Box, Typography, Button, LinearProgress } from '@mui/material';
import { AccountBalanceWallet, TrendingUp } from '@mui/icons-material';

const WalletWidget = ({ balance }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Wallet Balance
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="bold">
            ₹{balance.toLocaleString()}
          </Typography>
        </Box>
        <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main' }} />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Monthly Spending Limit
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={60} 
          sx={{ height: 8, borderRadius: 4 }} 
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" fullWidth>
          Add Money
        </Button>
        <Button variant="outlined" fullWidth>
          Withdraw
        </Button>
      </Box>
    </Paper>
  );
};

export default WalletWidget;
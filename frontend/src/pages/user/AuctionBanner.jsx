import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Gavel } from '@mui/icons-material';

const AuctionBanner = () => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(45deg, #0098DB 30%, #00b0ff 90%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Buy Vehicle From Auction
        </Typography>
        <Typography variant="subtitle1">
          Grow your business
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="inherit"
        sx={{ color: '#0098DB' }}
        endIcon={<Gavel />}
      >
        View Auction
      </Button>
    </Paper>
  );
};

export default AuctionBanner;
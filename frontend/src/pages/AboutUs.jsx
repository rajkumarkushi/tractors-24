import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const AboutUs = ({ onClose }) => {
  return (
    <Box>
      <Typography
        id="dynamic-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2, color: '#ff4444' }}
      >
        About Tractors-24
      </Typography>
      <Typography id="dynamic-modal-description" sx={{ mb: 2 }}>
        Welcome to <strong>Tractors-24</strong>, your premier online platform dedicated to the agriculture and tractor industries.
        <br />
        We aim to provide:
        <ul>
          <li>Reliable information and insights for farmers and businesses.</li>
          <li>A comprehensive platform for buying and selling agricultural equipment.</li>
          <li>Resources to stay ahead in the agricultural revolution.</li>
        </ul>
        <strong>Our Mission:</strong> Empower farmers with the tools and knowledge they need to succeed in the modern agricultural world.
        <br />
        <strong>Our Vision:</strong> To become the go-to platform for all things related to tractors and agriculture.
      </Typography>
      <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 3, bgcolor: '#116978' }}>
        Close
      </Button>
    </Box>
  );
};

export default AboutUs;
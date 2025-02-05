import React from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';

const ContactUs = ({ onClose }) => {
  return (
    <Box>
      <Typography
        id="dynamic-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2, color: '#ff4444' }}
      >
        Contact Information
      </Typography>
      <Typography id="dynamic-modal-description" sx={{ mb: 2 }}>
        <strong>Email:</strong> questdigiflex@gmail.com
        <br />
        <strong>Phone:</strong> +1 (123) 456-7890
        <br />
        <strong>Address:</strong> main street, indore City, madhya pradesh, ZIP Code
        <br />
        <strong>Business Hours:</strong>
        <ul>
          <li>Monday to Friday: 10:00 AM - 7:00 PM (UTC)</li>
          <li>Sartuarday & Sunday: Closed</li>
        </ul>
      </Typography>
      <Typography sx={{ mb: 2 }}>
        <strong>Contact Form</strong>
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField label="Name" fullWidth />
        <TextField label="Email" fullWidth />
        <TextField label="Phone (optional)" fullWidth />
        <TextField label="Subject" fullWidth />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" sx={{ bgcolor: '#116978' }}>
          Submit
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 3, bgcolor: '#116978' }}>
        Close
      </Button>
    </Box>
  );
};

export default ContactUs;
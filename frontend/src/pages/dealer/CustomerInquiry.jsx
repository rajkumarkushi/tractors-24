import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Email, Phone, Comment, Schedule } from '@mui/icons-material';

const CustomerInquiries = () => {
  const [status, setStatus] = useState('all');
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [response, setResponse] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [status]);
  // `/api/inquiries?showroomId=${showroomId}
  const fetchInquiries = async () => {
    try {
      const showroomId = 'your-showroom-id'; // Replace with actual showroom ID
      const url =`http://localhost:5000/api/inquiries/all${status !== 'all' ? `&status=${status}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setInquiries(data.inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'responded',
          response: response
        })
      });
      setOpenDialog(false);
      fetchInquiries();
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'responded': return 'success';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Customer Inquiries</Typography>
        <Tabs
          value={status}
          onChange={(e, newValue) => setStatus(newValue)}
          sx={{ mb: 3}}
        >
          <Tab value="all" label="All Inquiries" />
          <Tab value="pending" label="Pending" />
          <Tab value="responded" label="Responded" />
          <Tab value="closed" label="Closed" />
        </Tabs>

        <Grid container spacing={3}>
          {inquiries.map((inquiry) => (
            <Grid item xs={12} md={6} key={inquiry.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{inquiry.customerName}</Typography>
                    <Chip
                      label={inquiry.status}
                      color={getStatusColor(inquiry.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Email fontSize="small" />
                    <Typography>{inquiry.email}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Phone fontSize="small" />
                    <Typography>{inquiry.phone}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Comment fontSize="small" />
                    <Typography>{inquiry.message}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <Schedule fontSize="small" aria-label="Schedule icon" />
  <Typography variant="caption">
    {inquiry?.createdAt
      ? new Date(inquiry.createdAt.toDate ? inquiry.createdAt.toDate() : inquiry.createdAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'No date available'}
  </Typography>
</Box>
                  {inquiry.status === 'pending' && (
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 ,bgcolor:"#116978"}}
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        setOpenDialog(true);
                      }}
                    >
                      Respond
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Respond to Inquiry</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Your Response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerInquiries;
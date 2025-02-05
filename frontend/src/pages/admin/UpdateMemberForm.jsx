import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const Input = styled('input')({
  display: 'none',
});

const UpdateMemberForm = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    role: 'member',
    membershipType: '',
    height: '',
    weight: '',
    dietPreferences: '',
    goal: '',
    emergencyContact: '',
    idProof: null,
    address: '',
    occupation: '',
    medicalHistory: '',
    joiningDate: '',
    membershipDuration: '',
  });

  const handleSearch = async () => {
    if (!searchEmail) {
      setSnackbar({
        open: true,
        message: 'Please enter an email to search',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/api/auth/search?email=${searchEmail}`);
      if (!response.ok) throw new Error('Member not found');

      const data = await response.json();
      setMemberData(data);
      setUpdateFormData(data);
      setShowUpdateForm(true);
      setSnackbar({
        open: true,
        message: 'Member found successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      });
      setMemberData(null);
      setShowUpdateForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateFormData(prev => ({
      ...prev,
      idProof: file
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(updateFormData).forEach(key => {
        if (key === 'idProof' && updateFormData[key]) {
          formDataToSend.append(key, updateFormData[key]);
        } else {
          formDataToSend.append(key, updateFormData[key]);
        }
      });

      const response = await fetch(`http://localhost:8081/api/auth/update/${memberData.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to update member');

      setSnackbar({
        open: true,
        message: 'Member updated successfully!',
        severity: 'success',
      });

      // Reset form and states
      setShowUpdateForm(false);
      setSearchEmail('');
      setMemberData(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Search Section */}
        <Card sx={{ mb: 4, backgroundColor: '#1E1E1E' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#FFD700' }}>
              Search Member
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  label="Search by Email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#444' },
                      '&:hover fieldset': { borderColor: '#FFD700' },
                    },
                    '& .MuiInputLabel-root': { color: '#888' },
                    '& .MuiOutlinedInput-input': { color: '#fff' },
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  startIcon={<SearchIcon />}
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#000',
                    '&:hover': { bgcolor: '#FFE44D' },
                    '&:disabled': { bgcolor: '#494949' },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Member Details & Update Form */}
        {showUpdateForm && memberData && (
          <Card sx={{ backgroundColor: '#1E1E1E' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#FFD700' }}>
                Update Member Details
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: '#333' }} />

              <form onSubmit={handleUpdate}>
                <Grid container spacing={3}>
                  {/* Personal Information */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: '#FFD700', mb: 2 }}>
                      Personal Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={updateFormData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#444' },
                          '&:hover fieldset': { borderColor: '#FFD700' },
                        },
                        '& .MuiInputLabel-root': { color: '#888' },
                        '& .MuiOutlinedInput-input': { color: '#fff' },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={updateFormData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#444' },
                          '&:hover fieldset': { borderColor: '#FFD700' },
                        },
                        '& .MuiInputLabel-root': { color: '#888' },
                        '& .MuiOutlinedInput-input': { color: '#fff' },
                      }}
                    />
                  </Grid>

                  {/* Add all other fields similar to AddMemberForm */}
                  {/* Include all the same fields as in AddMemberForm with the same styling */}
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      startIcon={<EditIcon />}
                      sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: '#FFD700',
                        color: '#000',
                        '&:hover': { bgcolor: '#FFE44D' },
                        '&:disabled': { bgcolor: '#494949' },
                      }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Update Member'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UpdateMemberForm;
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const Input = styled('input')({
  display: 'none',
});

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      idProof: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'idProof' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:5000/api/auth/add', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }

      const data = await response.json();
      setSnackbar({
        open: true,
        message: 'Member added successfully!',
        severity: 'success',
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
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

    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add member',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ backgroundColor: '#1E1E1E' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#FFD700' }}>
              Add New Member
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Personal Information Section */}
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
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#888' }}>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      sx={{
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#444',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFD700',
                        },
                      }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                {/* Membership Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, mt: 2 }}>
                    Membership Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#888' }}>Membership Type</InputLabel>
                    <Select
                      name="membershipType"
                      value={formData.membershipType}
                      onChange={handleChange}
                      required
                      sx={{
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#444',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFD700',
                        },
                      }}
                    >
                      <MenuItem value="basic">Basic</MenuItem>
                      <MenuItem value="premium">Premium</MenuItem>
                      <MenuItem value="platinum">Platinum</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#888' }}>Membership Duration</InputLabel>
                    <Select
                      name="membershipDuration"
                      value={formData.membershipDuration}
                      onChange={handleChange}
                      required
                      sx={{
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#444',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#FFD700',
                        },
                      }}
                    >
                      <MenuItem value="1">1 Month</MenuItem>
                      <MenuItem value="3">3 Months</MenuItem>
                      <MenuItem value="6">6 Months</MenuItem>
                      <MenuItem value="12">12 Months</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Physical Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, mt: 2 }}>
                    Physical Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medical History"
                    name="medicalHistory"
                    multiline
                    rows={2}
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                {/* Additional Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, mt: 2 }}>
                    Additional Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Diet Preferences"
                    name="dietPreferences"
                    multiline
                    rows={2}
                    value={formData.dietPreferences}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fitness Goals"
                    name="goal"
                    multiline
                    rows={2}
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#444',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FFD700',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#888',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#fff',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <label htmlFor="id-proof">
                    <Input
                      accept="image/*,.pdf"
                      id="id-proof"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      sx={{
                        height: '56px',
                        color: '#FFD700',
                        borderColor: '#444',
                        '&:hover': {
                          borderColor: '#FFD700',
                          backgroundColor: 'rgba(255, 215, 0, 0.04)',
                        },
                      }}
                    >
                      Upload ID Proof
                    </Button>
                  </label>
                  {formData.idProof && (
                    <Typography variant="caption" sx={{ color: '#888', mt: 1, display: 'block' }}>
                      File selected: {formData.idProof.name}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      bgcolor: '#FFD700',
                      color: '#000',
                      '&:hover': {
                        bgcolor: '#FFE44D',
                      },
                      '&:disabled': {
                        bgcolor: '#494949',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Add Member'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
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

export default AddMemberForm;
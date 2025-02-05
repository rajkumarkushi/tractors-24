import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Snackbar
} from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signupUser, socialLogin } from '../../services/Api';
import banner from './login3.jpg'
import Navbar from '../Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'customer', // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name) return 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) 
      return 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) 
      return 'Valid phone number is required';
    if (!formData.password || formData.password.length < 6)
      return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSnackbar({
        open: true,
        message: validationError,
        severity: 'error'
      });
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      const data = await signupUser(signupData);
      console.log('Signup successful:', data);
      setSnackbar({
        open: true,
        message: 'Signup successful! Redirecting to login...',
        severity: 'success'
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      setSnackbar({
        open: true,
        message: err.message || 'Signup failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const token = 'social-auth-token'; // This should be obtained from the social login provider
      const data = await socialLogin(provider, token);
      console.log(`${provider} signup successful:`, data);
      setSnackbar({
        open: true,
        message: `${provider} signup successful! Redirecting to dashboard...`,
        severity: 'success'
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(`${provider} signup failed. Please try again.`);
      setSnackbar({
        open: true,
        message: `${provider} signup failed. Please try again.`,
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    {/* Navbar */}
    <Navbar />
     <Box sx={{ display: 'flex', flex: 1 }}>
      {/* Left side - Image with gradient overlay */}
      <Box
        sx={{
          width: '50%',
          position: 'relative',
          display: { xs: 'none', md: 'block' },
          backgroundColor: '#003366',
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={banner}
          alt="Happy customer with car keys"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(0,51,102,0.9) 0%, rgba(0,51,102,0) 100%)',
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            color: 'white',
            fontWeight: 700,
            maxWidth: '80%'
          }}
        >
          Join Tractor24 Today
        </Typography>
      </Box>

      {/* Right side - Signup form */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: '100vh',
          bgcolor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper 
            elevation={3} 
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 2,
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: '#003366',
                fontWeight: 600,
                mb: 3
              }}
            >
              Sign Up
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Already have an account?{' '}
                <Link 
                  href="/login"
                  sx={{ 
                    color: '#003366',
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 1
                }}
              >
                {error}
              </Alert>
            )}

            <Box 
              sx={{ 
                mb: 3,
                display: 'flex',
                gap: 1
              }}
            >
              <Button
                variant={formData.role === 'customer' ? 'contained' : 'outlined'}
                onClick={() => setFormData({...formData, role: 'customer'})}
                sx={{ 
                  flex: 1,
                  bgcolor: formData.role === 'customer' ? '#003366' : 'transparent',
                  '&:hover': {
                    bgcolor: formData.role === 'customer' ? '#002244' : 'rgba(0,51,102,0.08)'
                  }
                }}
              >
                Customer
              </Button>
              <Button
                variant={formData.role === 'dealer' ? 'contained' : 'outlined'}
                onClick={() => setFormData({...formData, role: 'dealer'})}
                sx={{ 
                  flex: 1,
                  bgcolor: formData.role === 'dealer' ? '#003366' : 'transparent',
                  '&:hover': {
                    bgcolor: formData.role === 'dealer' ? '#002244' : 'rgba(0,51,102,0.08)'
                  }
                }}
              >
                Dealer
              </Button>
            </Box>

            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666',
                mb: 2
              }}
            >
              Connect with
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('facebook')}
                sx={{ 
                  borderColor: '#1877F2',
                  color: '#1877F2',
                  '&:hover': {
                    borderColor: '#1877F2',
                    bgcolor: 'rgba(24,119,242,0.08)'
                  }
                }}
              >
                Facebook
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('google')}
                sx={{ 
                  borderColor: '#DB4437',
                  color: '#DB4437',
                  '&:hover': {
                    borderColor: '#DB4437',
                    bgcolor: 'rgba(219,68,55,0.08)'
                  }
                }}
              >
                Google
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  px: 2
                }}
              >
                Or
              </Typography>
            </Divider>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#003366',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#003366',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#003366',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#003366',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ maxLength: 10 }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#003366',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#003366',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#003366',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#003366',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#003366',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#003366',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 2,
                  mb: 3,
                  height: 48,
                  bgcolor: '#003366',
                  '&:hover': {
                    bgcolor: '#002244'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>

              <Typography 
                variant="body2" 
                align="center"
                sx={{ color: '#666' }}
              >
                By signing up, you agree to the{' '}
                <Link 
                  href="/user-agreement"
                  sx={{ 
                    color: '#003366',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  User Agreement
                </Link>
                ,{' '}
                <Link 
                  href="/privacy-policy"
                  sx={{ 
                    color: '#003366',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Privacy Policy
                </Link>
                {' '}&{' '}
                <Link 
                  href="/auction-terms"
                  sx={{ 
                    color: '#003366',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Auction Terms
                </Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </Box>
  );
};

export default Signup;


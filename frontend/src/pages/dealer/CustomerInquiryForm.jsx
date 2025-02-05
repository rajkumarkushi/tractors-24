// src/components/CustomerInquiryForm.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Slide,
  styled,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReCAPTCHA from "react-google-recaptcha";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    '&:hover fieldset': {
      borderColor: '#0098DB',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0098DB',
    },
  },
}));

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const TRACTOR_BRANDS = [
  { value: 'MF', label: 'Massey Ferguson' },
  { value: 'EICHER', label: 'EICHER' },
  { value: 'TAFE', label: 'TAFE' },
  { value: 'MAHINDRA', label: 'Mahindra' },
  { value: 'SONALIKA', label: 'Sonalika' }
];

const INITIAL_FORM_STATE = {
  name: '',
  dealershipName: '',
  tractorBrand: '',
  dealerCode: '',
  tehsil: '',
  district: '',
  state: '',
  phone: '',
  email: '',
};

const CustomerInquiryForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dealershipName.trim()) newErrors.dealershipName = 'Dealership name is required';
    if (!formData.tractorBrand) newErrors.tractorBrand = 'Tractor brand is required';
    if (!formData.dealerCode.trim()) newErrors.dealerCode = 'Dealer code is required';
    if (!formData.tehsil.trim()) newErrors.tehsil = 'Tehsil is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields correctly',
        severity: 'error'
      });
      return;
    }

    if (!captchaVerified) {
      setSnackbar({
        open: true,
        message: 'Please verify the captcha',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/inquiries/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Form submitted successfully!',
          severity: 'success'
        });
        setFormData(INITIAL_FORM_STATE);
        setCaptchaVerified(false);
        onClose();
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error submitting form. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: '#f8f9fa'
          }
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            bgcolor: '#fff',
            borderBottom: '1px solid #e0e0e0',
            position: 'relative',
            py: 3
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            ARE YOU AN MF / EICHER TRACTORS DEALER?
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#666'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              color: '#666'
            }}
          >
            FILL THIS FORM TO REGISTER NOW!
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 3,
              mb: 3
            }}>
              <StyledTextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading}
              />
              
              {/* Continue with other form fields... */}
              
              <StyledTextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
                sx={{ gridColumn: '1 / -1' }}
              />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 3
            }}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} // Use test key if env not set
                onChange={(value) => setCaptchaVerified(!!value)}
              />
              
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !captchaVerified}
                sx={{
                  bgcolor: '#0098DB',
                  color: 'white',
                  px: 6,
                  py: 1.5,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: '#0087c4'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomerInquiryForm;
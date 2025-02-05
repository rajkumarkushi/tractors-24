import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import banner from '../pages/auth/login3.jpg';
const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
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
              height: '50%',
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
            Privacy Policy
          </Typography>
        </Box>

        {/* Right side - Privacy Policy content */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            bgcolor: '#f8f9fa',
            display: 'flex',
            alignItems: 'flex-start',
            overflowY: 'auto',
            py: 4
          }}
        >
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/login', { replace: true })}
              sx={{
                mb: 3,
                color: '#003366',
                '&:hover': {
                  bgcolor: 'rgba(0,51,102,0.08)'
                }
              }}
            >
              Back to Login
            </Button>

            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 2,
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ color: '#003366', fontWeight: 600, mb: 3 }}>
                Privacy Policy
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>Effective Date: January 17, 2025</strong>
              </Typography>

              <Typography variant="body1" paragraph>
                At Tractor24, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform. By using our services, you consent to the practices described in this policy.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                1. Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We may collect the following types of information:<br /><br />
                <strong>Personal Information</strong>: Information that can identify you, such as your name, email address, phone number, and payment information.<br /><br />
                <strong>Usage Data</strong>: Information about how you use our platform, including your IP address, browser type, and pages visited.<br /><br />
                <strong>Cookies</strong>: Small data files stored on your device that help us improve your experience on our platform.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                2. How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use the information we collect for various purposes, including:<br />
                • To provide and maintain our services<br />
                • To process transactions and manage your account<br />
                • To communicate with you, including sending updates and promotional materials<br />
                • To improve our platform and develop new services<br />
                • To monitor usage and analyze trends
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                3. Sharing Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:<br /><br />
                <strong>With Service Providers</strong>: We may share your information with third-party vendors who assist us in operating our platform and providing services.<br /><br />
                <strong>For Legal Reasons</strong>: We may disclose your information if required by law or to protect our rights and the rights of others.<br /><br />
                <strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                4. Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We take the security of your information seriously and implement reasonable measures to protect it. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                5. Your Rights
              </Typography>
              <Typography variant="body1" paragraph>
                You have certain rights regarding your personal information, including:<br />
                • The right to access and request a copy of your information<br />
                • The right to request corrections to inaccurate information<br />
                • The right to request the deletion of your information, subject to legal obligations
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                6. Cookies and Tracking Technologies
              </Typography>
              <Typography variant="body1" paragraph>
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can manage your cookie preferences through your browser settings. However, disabling cookies may affect your ability to use certain features of our platform.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                7. Changes to This Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically for any updates.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                8. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions or concerns about this Privacy Policy, please contact our support team.
              </Typography>

              <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
                Thank you for trusting Tractor24 with your information. We are committed to protecting your privacy and providing a safe online experience.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
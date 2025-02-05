import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import banner from '../pages/auth/login3.jpg';

const UserAgreement = () => {
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
            User Agreement
          </Typography>
        </Box>

        {/* Right side - User Agreement content */}
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
            {/* <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/login')}
              sx={{
                mb: 3,
                color: '#003366',
                '&:hover': {
                  bgcolor: 'rgba(0,51,102,0.08)'
                }
              }}
            >
              Back to Login
            </Button> */}
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
                User Agreement
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>Effective Date: January 17, 2025</strong>
              </Typography>

              <Typography variant="body1" paragraph>
                Welcome to Tractor24! This User Agreement outlines the terms and conditions under which you may use our services. By accessing or using our platform, you agree to comply with these terms. If you do not agree, please do not use our services.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                • By creating an account or using our services, you confirm that you are at least 18 years old and have the legal capacity to enter into this agreement.<br />
                • You agree to abide by all applicable laws and regulations.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                2. User Responsibilities
              </Typography>
              <Typography variant="body1" paragraph>
                • You are responsible for maintaining the confidentiality of your account information, including your password.<br />
                • You agree to notify us immediately of any unauthorized use of your account.<br />
                • You must not engage in any activity that could harm the platform or its users, including but not limited to:<br />
                &nbsp;&nbsp;- Posting false or misleading information<br />
                &nbsp;&nbsp;- Harassing or threatening other users<br />
                &nbsp;&nbsp;- Distributing spam or malicious software
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                3. Services Provided
              </Typography>
              <Typography variant="body1" paragraph>
                • Tractor24 offers a variety of services, including but not limited to:<br />
                &nbsp;&nbsp;- Access to tractor listings<br />
                &nbsp;&nbsp;- Loan and insurance inquiry forms<br />
                &nbsp;&nbsp;- Wallet management and transaction history<br />
                • We reserve the right to modify or discontinue any service at any time without prior notice.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                4. Payment Terms
              </Typography>
              <Typography variant="body1" paragraph>
                • Certain services may require payment. By using these services, you agree to pay all applicable fees.<br />
                • Refund policies will be outlined separately and are subject to change.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                5. Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                • Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.<br />
                • By using our services, you consent to the collection and use of your information as described in the Privacy Policy.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                6. Dispute Resolution
              </Typography>
              <Typography variant="body1" paragraph>
                • In the event of a dispute, we encourage you to contact us directly to resolve the issue amicably.<br />
                • If a resolution cannot be reached, disputes will be handled in accordance with the applicable laws.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                7. Amendments
              </Typography>
              <Typography variant="body1" paragraph>
                • We may update this User Agreement from time to time. Changes will be posted on our platform, and your continued use of the services constitutes acceptance of the new terms.<br />
                • It is your responsibility to review the User Agreement periodically for updates.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                8. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                • If you have any questions or concerns regarding this User Agreement, please contact our support team.
              </Typography>

              <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
                Thank you for choosing Tractor24! We look forward to serving you.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAgreement;
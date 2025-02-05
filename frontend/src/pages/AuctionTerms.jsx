import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import banner from '../pages/auth/login3.jpg';

const AuctionTerms = () => {
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
            Auction Terms
          </Typography>
        </Box>

        {/* Right side - Auction Terms content */}
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
                Tractor Auction Terms and Conditions
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>Effective Date: January 17, 2025</strong>
              </Typography>

              <Typography variant="body1" paragraph>
                Welcome to Tractor24's Tractor Auction! By participating in our auction, you agree to abide by the following terms and conditions. Please read them carefully before placing a bid.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                1. Eligibility to Bid
              </Typography>
              <Typography variant="body1" paragraph>
                • Participants must be at least 18 years old to bid in the auction.<br />
                • By registering for the auction, you confirm that you have the legal capacity to enter into a binding agreement.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                2. Registration
              </Typography>
              <Typography variant="body1" paragraph>
                • To participate in the auction, you must create an account on our platform.<br />
                • You are responsible for maintaining the confidentiality of your account information, including your password.<br />
                • You agree to provide accurate and complete information during the registration process.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                3. Auction Process
              </Typography>
              <Typography variant="body1" paragraph>
                • The auction will begin and end at the specified times as indicated on the platform.<br />
                • Bids can be placed online through the platform during the auction period.<br />
                • Each bid must meet the minimum bid increment set for each item.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                4. Bidding Rules
              </Typography>
              <Typography variant="body1" paragraph>
                • Bids are binding and cannot be withdrawn once placed.<br />
                • The highest bid at the end of the auction will be declared the winner.<br />
                • In the event of a tie, the earliest bid will take precedence.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                5. Payment Terms
              </Typography>
              <Typography variant="body1" paragraph>
                • The winning bidder will receive an invoice via email after the auction ends.<br />
                • Payment must be made within 3 days of receiving the invoice.<br />
                • A non-refundable deposit may be required to secure the winning bid.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                6. Buyer's Premium
              </Typography>
              <Typography variant="body1" paragraph>
                • A buyer's premium will be added to the final bid amount. This fee is payable by the winning bidder and is non-negotiable.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                7. Item Description and Inspection
              </Typography>
              <Typography variant="body1" paragraph>
                • All items are sold "as-is" with no warranties or guarantees.<br />
                • Descriptions and photographs of the tractors are provided for informational purposes only.<br />
                • Bidders are encouraged to inspect items before bidding. Inspection details will be provided on the platform.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                8. Transfer of Ownership
              </Typography>
              <Typography variant="body1" paragraph>
                • Ownership of the tractor will be transferred to the winning bidder upon full payment.<br />
                • A bill of sale will be provided to the winning bidder as proof of purchase.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                9. Taxes and Fees
              </Typography>
              <Typography variant="body1" paragraph>
                • The winning bidder is responsible for any applicable taxes, registration fees, and other costs associated with the purchase of the tractor.<br />
                • It is the bidder's responsibility to understand the tax implications of their purchase.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                10. Default and Non-Payment
              </Typography>
              <Typography variant="body1" paragraph>
                • If the winning bidder fails to make payment within the specified timeframe, the auction may be considered void.<br />
                • The platform reserves the right to take legal action to recover any losses incurred due to non-payment.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                11. Dispute Resolution
              </Typography>
              <Typography variant="body1" paragraph>
                • In the event of a dispute regarding a bid or auction item, the platform will act as the final authority.<br />
                • Disputes must be submitted in writing within 7 days of the auction's conclusion.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                12. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                • Tractor24 is not liable for any direct, indirect, incidental, or consequential damages arising from your participation in the auction.<br />
                • We do not guarantee the accuracy of item descriptions or the availability of items.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                13. Changes to Terms and Conditions
              </Typography>
              <Typography variant="body1" paragraph>
                • Tractor24 reserves the right to modify these terms and conditions at any time.<br />
                • Any changes will be posted on the platform, and your continued participation in the auction constitutes acceptance of the new terms.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                14. Governing Law
              </Typography>
              <Typography variant="body1" paragraph>
                • These terms and conditions shall be governed by and construed in accordance with applicable laws.
              </Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#003366' }}>
                15. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                • If you have any questions or concerns regarding these terms and conditions, please contact our support team.
              </Typography>

              <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
                Thank you for participating in Tractor24's Tractor Auction! We wish you the best of luck in your bidding and hope you find the perfect tractor for your needs.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AuctionTerms;
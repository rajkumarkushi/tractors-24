import React, { useState } from 'react';
import { Grid, Typography, Link, Box, Container, Modal } from '@mui/material';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

export default function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpen = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85vh',
      }}
    >
<Box sx={{ flex: 1, py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Important Links Column */}
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ color: '#ff4444', mb: 2 }}>
                Important Links
              </Typography>
              {[
                { text: 'About Us', content: 'about' },
                { text: 'Contact / Mail Us', content: 'contact' },
                'Careers',
                'Customer Care',
                'Service Centers',
                'Loan',
                'Guest Post',
                'Tractor Dealers',
              ].map((item) =>
                typeof item === 'string' ? (
                  <Box key={item} sx={{ mb: 1 }}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{ color: '#444', '&:hover': { color: '#666' } }}
                    >
                      {item}
                    </Link>
                  </Box>
                ) : (
                  <Box key={item.text} sx={{ mb: 1 }}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{ color: '#444', '&:hover': { color: '#666' } }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen(item.content);
                      }}
                    >
                      {item.text}
                    </Link>
                  </Box>
                )
              )}
            </Grid>


{/* Buy Old Products Column */}
<Grid item xs={12} sm={3}>
  <Typography variant="h6" sx={{ color: '#ff4444', mb: 2 }}>
    Buy Old Products
  </Typography>
  {[
    'Buy Used Tractor', 
    'Buy Used Farm Implements', 
    'Buy Used Harvester',
    'Compare Used Tractors', // Added items to balance
    'Popular Brands',        // Added items to balance
    'Latest Listings'        // Added items to balance
  ].map((text) => (
    <Box key={text} sx={{ mb: 1 }}>
      <Link
        href="#"
        underline="none"
        sx={{ color: '#444', '&:hover': { color: '#666' } }}
      >
        {text}
      </Link>
    </Box>
  ))}
</Grid>

{/* Sell Old Products Column */}
<Grid item xs={12} sm={3}>
  <Typography variant="h6" sx={{ color: '#ff4444', mb: 2 }}>
    Sell Old Products
  </Typography>
  {[
    'Sell Used Tractor', 
    'Sell Used Farm Implements', 
    'Sell Used Harvester',
    'Post Free Ad',           // Added items to balance
    'Dealer Registration',    // Added items to balance
    'Selling Guidelines'      // Added items to balance
  ].map((text) => (
    <Box key={text} sx={{ mb: 1 }}>
      <Link
        href="#"
        underline="none"
        sx={{ color: '#444', '&:hover': { color: '#666' } }}
      >
        {text}
      </Link>
    </Box>
  ))}
</Grid>


{/* Explore News Column */}
<Grid item xs={12} sm={3}>
              <Typography variant="h6" sx={{ color: '#ff4444', mb: 2 }}>
                Explore News
              </Typography>
              {[
                'Tractor News',
                'Agriculture News',
                'Weather News',
                'Agri Business News',
                'Sarkari Yojana News',
                'Agriculture Machinery News',
                'Social News',
                'Animal Husbandry News',
                'Tractor Subsidy',
              ].map((text) => (
                <Box key={text} sx={{ mb: 1 }}>
                  <Link
                    href="#"
                    underline="none"
                    sx={{ color: '#444', '&:hover': { color: '#666' } }}
                  >
                    {text}
                  </Link>
                </Box>
              ))}
            </Grid>

              
          </Grid>
        </Container>
      </Box>

      {/* Dynamic Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="dynamic-modal-title"
        aria-describedby="dynamic-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 400, sm: 700, md: 900 },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {modalContent === 'about' && <AboutUs onClose={handleClose} />}
          {modalContent === 'contact' && <ContactUs onClose={handleClose} />}
        </Box>
      </Modal>

 {/* Footer Section */}
      <Box
        sx={{
          bgcolor: '#0e5254',
          color: 'white',
          py: 2,
          mt: 'auto',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2">
              © Copyright Tractors-24 2024. All Rights Reserved.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {['Blog', 'About Us', 'Privacy Policy', 'Terms & Policy', 'Terms of Service', 'Sitemap', 'FAQ'].map(
                (item, index, array) => (
                  <React.Fragment key={item}>
                    <Link
                      href="#"
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item === 'About Us') handleOpen('about');
                      }}
                    >
                      {item}
                    </Link>
                    {index !== array.length - 1 && (
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.5)',
                          userSelect: 'none',
                        }}
                      >
                        |
                      </Typography>
                    )}
                  </React.Fragment>
                )
              )}
            </Box>
          </Box>
        </Container>
      </Box>   
        </Box>
  );
}
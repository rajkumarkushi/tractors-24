// frontend/src/pages/TractorDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
  Stack,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  WhatsApp,
  CalendarToday,
  Speed,
  Settings,
  Close,
  NavigateBefore,
  NavigateNext,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import axios from 'axios';
import ContactSellerForm from '../ContactSellerForm';

const SpecificationRow = ({ label, value }) => (
  <TableRow>
    <TableCell 
      component="th" 
      sx={{ 
        width: '40%', 
        color: 'text.secondary',
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
      }}
    >
      {label}
    </TableCell>
    <TableCell
      sx={{ 
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        fontWeight: 500
      }}
    >
      {value || 'N/A'}
    </TableCell>
  </TableRow>
);

const TractorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tractor, setTractor] = useState(null);
  const [similarTractors, setSimilarTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageDialog, setShowImageDialog] = useState(false);

  useEffect(() => {
    fetchTractorDetails();
  }, [id]);

  const fetchTractorDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/tractors/tractors/${id}`);
      
      if (response.data.success) {
        setTractor(response.data.tractor);
        setSimilarTractors(response.data.similarTractors);
      } else {
        setError('Failed to fetch tractor details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tractor details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!tractor) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Tractor not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Grid container spacing={3}>
          {/* Left Column - Images and Details */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 3 }}>
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  mb: 2,
                  cursor: 'pointer'
                }}
                onClick={() => setShowImageDialog(true)}
              >
                <Box
                  component="img"
                  src={tractor.images}
                  alt={tractor.name}
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Box>

              {/* Thumbnail Images
              <ImageList
                sx={{
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
                
              >
                {tractor.images.map((image, index) => (
                  <ImageListItem 
                    key={index}
                    sx={{ 
                      width: 100,
                      flexShrink: 0,
                      cursor: 'pointer',
                      border: index === selectedImageIndex ? '2px solid #0098DB' : 'none',
                      borderRadius: 1
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${tractor.name} - ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '75px',
                        objectFit: 'cover'
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList> */}
            </Paper>

            {/* Specifications */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <SpecificationRow label="Brand" value={tractor.brand} />
                    <SpecificationRow label="Model" value={tractor.model} />
                    <SpecificationRow label="Registration Year" value={tractor.registrationYear} />
                    <SpecificationRow label="Horse Power" value={`${tractor.horsePower} HP`} />
                    <SpecificationRow label="Hours" value={`${tractor.hours} Hrs`} />
                    <SpecificationRow label="Registration Number" value={tractor.registrationNumber} />
                    <SpecificationRow label="Insurance Status" value={tractor.insuranceStatus} />
                    <SpecificationRow label="Rear Tyre" value={tractor.rearTyre} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Additional Specifications */}
            {tractor.specifications && (
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Technical Specifications
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <SpecificationRow label="Engine" value={tractor.specifications.engine} />
                      <SpecificationRow label="Transmission" value={tractor.specifications.transmission} />
                      <SpecificationRow label="Fuel Type" value={tractor.specifications.fuelType} />
                      <SpecificationRow label="Mileage" value={tractor.specifications.mileage} />
                      <SpecificationRow label="Engine CC" value={tractor.specifications.engineCC} />
                      <SpecificationRow label="No. of Cylinders" value={tractor.specifications.noOfCylinders} />
                      <SpecificationRow label="Gear Box" value={tractor.specifications.gearBox} />
                      <SpecificationRow label="Wheel Drive" value={tractor.specifications.wheelDrive} />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}

            {/* Features */}
            {tractor.features && tractor.features.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tractor.features.map((feature, index) => (
                    <Chip
                      key={index}
                      icon={<CheckCircle sx={{ fontSize: 16 }} />}
                      label={feature}
                      sx={{ bgcolor: '#e3f2fd' }}
                    />
                  ))}
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Right Column - Price and Contact */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>
                ₹ {tractor.sellPrice} INR*
              </Typography>
              {tractor.showroomPrice && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  Ex-Showroom: ₹ {tractor.showroomPrice} INR
                </Typography>
              )}

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpenContactForm(true)}
                >
                  Contact Seller
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<WhatsApp />}
                  href={`https://wa.me/${tractor.showroom?.phone}?text=I'm interested in your tractor ${tractor.brand} ${tractor.model}`}
                  target="_blank"
                >
                  WhatsApp
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Seller/Showroom Details */}
              {tractor.showroom && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Seller Details
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {tractor.showroom.name}
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tractor.district}, {tractor.state}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {tractor.showroom.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Paper>

            {/* Similar Tractors */}
            {similarTractors.length > 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Similar Tractors
                </Typography>
                <Stack spacing={2}>
                  {similarTractors.map((similar) => (
                    <Box
                      key={similar.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                      onClick={() => navigate(`/tractor/${similar.id}`)}
                    >
                      <Box
                        component="img"
                        src={similar.images}
                        sx={{
                          width: 80,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 1
                        }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {similar.brand} {similar.model}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹ {similar.sellPrice} INR
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Image Dialog */}
        <Dialog
          open={showImageDialog}
          onClose={() => setShowImageDialog(false)}
          maxWidth="lg"
          fullWidth
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              sx={{ 
                position: 'absolute', 
                right: 8, 
                top: 8, 
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)'
                }
              }}
              onClick={() => setShowImageDialog(false)}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={tractor.images}
              alt={tractor.name}
              sx={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
            <IconButton
              sx={{ 
                position: 'absolute', 
                left: 8, 
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)'
                }
              }}
              onClick={() => setSelectedImageIndex(prev => 
                prev === 0 ? tractor.images.length - 1 : prev - 1
              )}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              sx={{ 
                position: 'absolute', 
                right: 8, 
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)'
                }
              }}
              onClick={() => setSelectedImageIndex(prev => 
                prev === tractor.images.length - 1 ? 0 : prev + 1
              )}
            >
              <NavigateNext />
            </IconButton>
          </Box>
        </Dialog>

        <ContactSellerForm
          open={openContactForm}
          onClose={() => setOpenContactForm(false)}
          tractor={tractor}
        />
      </Container>
    </Box>
  );
};

export default TractorDetails;
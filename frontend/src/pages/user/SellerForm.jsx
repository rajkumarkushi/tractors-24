import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../utils/langaugeContext';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to bottom, #ffffff, #f8f9ff)',
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  overflowX: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    height: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
  },
}));

const Thumbnail = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: 8,
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
  border: `2px solid ${theme.palette.divider}`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const UploadPlaceholder = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: 8,
  border: `2px dashed ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.lighter,
  },
}));
const SellVehicle = () => {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    model: '',
    registrationYear: '',
    horsePower: '',
    rearTyreSize: '',
    hoursDriven: '',
    expectedPrice: '',
    insuranceStatus: '',
    registrationNumber: '',
    description: '',
    state: '',
    district: '',
    pincode: '',
    sellerContact: '',
    sellerEmail: ''
  });
  const { language, translateText } = useLanguage();
  const [translations, setTranslations] = useState({});

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const insuranceOptions = ['Active', 'Expired', 'None'];
  const brands = ['Mahindra', 'TATA', 'John Deere', 'New Holland', 'Massey Ferguson', 'Sonalika', 'Eicher'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    
    setPhotos(prevPhotos => [...prevPhotos, ...files]);
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    if (selectedImageIndex >= index) {
      setSelectedImageIndex(Math.max(0, selectedImageIndex - 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      photos.forEach(photo => {
        formDataToSend.append('photos', photo);
      });

      const response = await fetch('http://localhost:5000/api/vehicles/sell', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Vehicle listing submitted successfully!');
      setFormData({
        brand: '',
        name: '',
        model: '',
        registrationYear: '',
        horsePower: '',
        rearTyreSize: '',
        hoursDriven: '',
        expectedPrice: '',
        insuranceStatus: '',
        registrationNumber: '',
        description: '',
        state: '',
        district: '',
        pincode: '',
        sellerContact: '',
        sellerEmail: ''
      });
      setPhotos([]);
      setPreviewUrls([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  // Add translations object
  const defaultTranslations = {
    productInformation: 'Product Information',
    addImages: 'Add Images',
    uploadProductImages: 'Upload product images',
    itemDetails: 'Item Details',
    productName: 'Product Name',
    brand: 'Brand',
    model: 'Model',
    registrationYear: 'Registration Year',
    horsePower: 'Horse Power',
    hoursDriven: 'Hours Driven',
    expectedPrice: 'Expected Price',
    insuranceStatus: 'Insurance Status',
    registrationNumber: 'Registration Number',
    description: 'Description',
    publishProduct: 'Publish Product',
    active: 'Active',
    expired: 'Expired',
    none: 'None',
    maximumImages: 'Maximum 5 images allowed',
    submissionSuccess: 'Vehicle listing submitted successfully!',
    submissionError: 'Failed to submit form. Please try again.'
  };

  // Translation function
  const translateContent = async () => {
    if (language === 'English') {
      setTranslations(defaultTranslations);
      return;
    }

    const translatedContent = {};
    for (const [key, value] of Object.entries(defaultTranslations)) {
      translatedContent[key] = await translateText(value, language);
    }
    setTranslations(translatedContent);
  };

  // Effect for translation
  useEffect(() => {
    translateContent();
  }, [language]);


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {translations.productInformation}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {translations.addImages}
              </Typography>

              <ImagePreview>
                {previewUrls.length > 0 ? (
                  <img src={previewUrls[selectedImageIndex]} alt="Selected preview" />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#116978', mb: 2 }} />
                    <Typography color="textSecondary">
                      {translations.uploadProductImages}
                    </Typography>
                  </Box>
                )}
              </ImagePreview>

              <ThumbnailContainer>
                {previewUrls.map((url, index) => (
                  <Thumbnail
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={selectedImageIndex === index ? {
                      borderColor: '#116978',
                      color: '#116978',
                      transform: 'scale(1.05)'
                    } : {}}
                  >
                    <img src={url} alt={`Thumbnail ${index + 1}`} />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto(index);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        color: '#116978'
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Thumbnail>
                ))}
                {previewUrls.length < 5 && (
                  <UploadPlaceholder component="label">
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}

                    />
                    <AddIcon />
                  </UploadPlaceholder>
                )}
              </ThumbnailContainer>
            </StyledPaper>
          </Grid>

          {/* Right Column - Form Fields */}
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {translations.itemDetails}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={translations.productName}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>{translations.brand}</InputLabel>
                    <Select
                      value={formData.brand}
                      name="brand"
                      onChange={handleInputChange}
                      label="Brand"
                    >
                      {brands.map(brand => (
                        <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.model}
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.registrationYear}
                    name="registrationYear"
                    type="number"
                    value={formData.registrationYear}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.horsePower}
                    name="horsePower"
                    type="number"
                    value={formData.horsePower}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.hoursDriven}
                    name="hoursDriven"
                    type="number"
                    value={formData.hoursDriven}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.expectedPrice}
                    name="expectedPrice"
                    type="number"
                    value={formData.expectedPrice}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>{translations.insuranceStatus}</InputLabel>
                    <Select
                      value={formData.insuranceStatus}
                      name="insuranceStatus"
                      onChange={handleInputChange}
                      label="Insurance Status"
                    >
                      {insuranceOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={translations.registrationNumber}
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={translations.description}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: '#116978',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',

                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Publish Product'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SellVehicle;
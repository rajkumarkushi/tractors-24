// frontend/src/pages/Hero.jsx
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
  InputLabel,
  Autocomplete,
  TextField,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import banner4 from '../images/poster_image4.png'
import banner5 from '../images/poster_image5.png'
import banner6 from '../images/poster_image6.png'

// Import your banner images
const bannerImages = [
  {
    url: `${banner4}`,
    // title: 'Sell Your Tractor at Best Price',
    // subtitle: 'Get instant valuation and best deals',
  },
  {
    url:  `${banner5}`,
    // title: 'Find Perfect Tractor',
    // subtitle: 'Explore wide range of tractors',
  },
  {
    url: `${banner6}`,
    // title: 'Sell Your Tractor at Best Price',
    // subtitle: 'Get instant valuation and best deals',
  },
];

const hpRanges = [
  { value: '20-35', label: '20 HP - 35 HP' },
  { value: '36-45', label: '36 HP - 45 HP' },
  { value: '46-55', label: '46 HP - 55 HP' },
  { value: '56-75', label: '56 HP - 75 HP' },
];

const brands = [
  'Mahindra',
  'Sonalika',
  'John Deere',
  'New Holland',
  'Massey Ferguson',
  'Swaraj',
  'Eicher',
  'Farmtrac',
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Hero = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('new');
  const [selectedHp, setSelectedHp] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    navigate('/search');
    
    try {
      const response = await axios.post('http://localhost:5000/api/tractors/search', {
        type: selectedType,
        hpRange: selectedHp,
        brand: selectedBrand,
        state: selectedState
      });
      
      // Handle the response - you might want to pass this to a parent component
      console.log(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Banner Slider */}
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        style={{ height: '450px' ,size: 'cover' }}
      >
        {bannerImages.map((banner, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '500px',
                backgroundImage: ` url(${banner.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>{banner.title}</Typography>
                <Typography variant="h5">{banner.subtitle}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Search Form */}
      <Container maxWidth="md" sx={{ mt: -5, position: 'relative', zIndex: 2 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Find your right tractor
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth >
                <InputLabel  sx={{color:'#116978'}}>Type</InputLabel>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  label="Type"
                >
                  {/* <MenuItem value="new">New Tractor</MenuItem> */}
                  <MenuItem value="used" >Used Tractor</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel >HP Range</InputLabel>
                <Select
                  value={selectedHp}
                  onChange={(e) => setSelectedHp(e.target.value)}
                  label="HP Range"
                >
                  {hpRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={selectedBrand}
                onChange={(_, newValue) => setSelectedBrand(newValue)}
                options={brands}
                renderInput={(params) => (
                  <TextField {...params} label="Select Brand" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={selectedState}
                onChange={(_, newValue) => setSelectedState(newValue)}
                options={indianStates}
                renderInput={(params) => (
                  <TextField {...params} label="Select State" />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  bgcolor: "#116978",
                  '&:hover': { bgcolor: "#116978" },
                }}
              >
                {loading ? 'Searching...' : 'Search Tractors'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Hero;
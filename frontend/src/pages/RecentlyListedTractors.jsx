// frontend/src/pages/RecentlyListedTractors.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  IconButton,
  Container,
  Skeleton,
  Alert,
  Grid
} from '@mui/material';
import { 
  FavoriteBorder, 
  LocationOn,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from 'axios';
import ContactSellerForm from './ContactSellerForm';

import tractor7 from '../images/Tractor_listing7.png';
import tractor8 from '../images/Tractor_listing8.png';
import tractor9 from '../images/Tractor_listing9.png';
import tractor10 from '../images/Tractor_listing10.png';
import tractor11 from '../images/Tractor_listing11.png';
import tractor12 from '../images/Tractor_listing12.png';
const tractorImages = [tractor7, tractor8, tractor9, tractor10, tractor11, tractor12];

const TractorCard = ({ tractor, onContactClick }) => {
  const navigate = useNavigate();
  const fallbackImage = '/tractor-placeholder.png';
  
  const randomTractor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * tractorImages.length);
    return tractorImages[randomIndex];
  }, []);

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    navigate(`/tractor/${tractor.id}`);
  };

  return (
    <Card sx={{ 
      m: 1,
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-5px)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: 3
      }
    }}
    onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={tractor.images?.[0] || randomTractor}
          alt={tractor.brand}
          sx={{ objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1
          }}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Add favorite functionality
            }}
          >
            <FavoriteBorder />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Add share functionality
            }}
          >
            <ShareIcon />
          </IconButton>
        </Box>

        {tractor.isNew && (
          <Box
            sx={{
              position: 'absolute',
              left: 15,
              top: 15,
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              zIndex: 1,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              New
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {tractor.brand ? `${tractor.brand} ${tractor.name || ''}` : 'Tractor Name Not Available'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
              {tractor.district && tractor.state ? 
                `${tractor.district}, ${tractor.state}` : 
                'Location Not Available'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Year: {tractor.registrationYear || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Hours: {tractor.hours || 'NA'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              HP: {tractor.horsePower || 'N/A'}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h6" color='#116978' gutterBottom>
            {tractor.sellPrice ? 
              `₹ ${tractor.sellPrice} INR*` : 
              'Price on Request'}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onContactClick(tractor);
            }}
            sx={{
              bgcolor: '#116978',
              '&:hover': {
                bgcolor: '#168d91'
              }
            }}
          >
            Contact Seller
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Box sx={{ m: 1 }}>
    <Skeleton variant="rectangular" height={200} />
    <Skeleton variant="text" sx={{ mt: 1 }} />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
  </Box>
);

const RecentlyListedTractors = () => {
  const navigate = useNavigate();
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchRecentTractors();
  }, []);

  const fetchRecentTractors = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/stock/popular', {
        params: {
          category: 'recently-listed',
          limit: 8,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          status: 'active'
        }
      });
      
      if (response.data.success) {
        setTractors(response.data.tractors);
      } else {
        setError('Failed to load recent tractors');
      }
    } catch (err) {
      console.error('Error fetching recent tractors:', err);
      setError(err.response?.data?.message || 'Failed to load recent tractors');
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (tractor) => {
    setSelectedTractor(tractor);
    setOpenContactForm(true);
  };

  const handleViewMore = () => {
    navigate('/tractors', { 
      state: { 
        filter: 'recent',
        sort: 'createdAt'
      } 
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
      <Container>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '100%',
              height: '3px',
              backgroundColor: '#116978',
            }
          }}
        >
          Recently Listed Tractors
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Slider ref={sliderRef} {...settings}>
            {loading ? 
              Array(4).fill(null).map((_, index) => (
                <LoadingSkeleton key={index} />
              )) :
              tractors.map((tractor) => (
                <Box key={tractor.id} sx={{ px: 1 }}>
                  <TractorCard 
                    tractor={tractor}
                    onContactClick={handleContactClick}
                  />
                </Box>
              ))
            }
          </Slider>

          {!loading && tractors.length > 4 && (
            <>
              <IconButton
                onClick={() => sliderRef.current?.slickPrev()}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#f5f5f5' },
                  zIndex: 1
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={() => sliderRef.current?.slickNext()}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#f5f5f5' },
                  zIndex: 1
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            onClick={handleViewMore}
            sx={{
              color: '#116978',
              borderColor: '#116978',
              borderStyle: 'dashed',
              borderWidth: '1px',
              borderRadius: '4px',
              px: 4,
              '&:hover': {
                borderColor: '#0087c4',
                bgcolor: 'rgba(0,152,219,0.05)',
              },
            }}
          >
            View More
          </Button>
        </Box>

        <ContactSellerForm
          open={openContactForm}
          onClose={() => {
            setOpenContactForm(false);
            setSelectedTractor(null);
          }}
          tractor={selectedTractor}
        />
      </Container>
    </Box>
  );
};

export default RecentlyListedTractors;
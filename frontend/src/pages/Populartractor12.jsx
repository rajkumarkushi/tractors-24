// frontend/src/pages/PopularTractor.jsx
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
  Grid,
  Container,
  Skeleton,
  Alert
} from '@mui/material';
import { 
  FavoriteBorder, 
  LocationOn,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from 'axios';
import ContactSellerForm from './ContactSellerForm';
// Import your tractor images
import tractor1 from '../images/Tractor_listing1.png';
import tractor2 from '../images/Tractor_listing2.png';
import tractor3 from '../images/Tractor_listing3.png';
import tractor5 from '../images/Tractor_listing4.png';
import tractor6 from '../images/Tractor_listing5.png';
import tractor4 from '../images/Tractor_listing6.png';
const tractorImages = [tractor1, tractor2, tractor3, tractor4, tractor5, tractor6];

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
    <Card 
      sx={{ 
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
      {tractor.isHotDeal && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 20,
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '4px 12px',
            zIndex: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -10,
              top: 0,
              borderTop: '16px solid #ff4444',
              borderBottom: '16px solid #ff4444',
              borderRight: '10px solid transparent'
            }
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            Save ₹{tractor.discount || '1000'}
          </Typography>
        </Box>
      )}

      {tractor.isNew && (
        <Box
          sx={{
            position: 'absolute',
            right: 15,
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

      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: 'rgba(255,255,255,0.8)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          zIndex: 1
        }}
        onClick={(e) => {
          e.stopPropagation();
          // Add favorite functionality
        }}
      >
        <FavoriteBorder />
      </IconButton>
      
      <CardMedia
        component="img"
        height="200"
        image={tractor.images?.[0] || randomTractor}
        alt={tractor.name || 'Tractor Image'}
        onError={(e) => {
          e.target.src = fallbackImage;
        }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {tractor.brand ? `${tractor.brand} ${tractor.name || ''}` : 'Tractor Name Not Available'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {tractor.district && tractor.state ? 
              `${tractor.district}, ${tractor.state}` : 
              'Location Not Available'}
          </Typography>
        </Box>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              {tractor.registrationYear || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" color="text.secondary">
              {tractor.hours ? `${tractor.hours} Hrs` : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {tractor.horsePower ? `${tractor.horsePower} HP` : 'N/A'}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center' }}>
          <Typography variant="h6" color='#116978'>
            {tractor.sellPrice ? 
              `₹ ${tractor.sellPrice} INR*` : 
              'Price on Request'}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onContactClick(tractor);
            }}
            sx={{
              bgcolor: '#116978',
              '&:hover': {
                bgcolor: '#168d91' 
              }
            }}          >
            Contact Seller
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
const LoadingSkeleton = () => (
  <Box sx={{ px: 1 }}>
    <Card>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} width="60%" sx={{ mb: 2 }} />
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Skeleton variant="text" height={24} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="text" height={24} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="text" height={24} />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="rectangular" width="30%" height={36} />
        </Box>
      </CardContent>
    </Card>
  </Box>
);

// ... existing imports ...

// ... existing imports ...

const PopularTractor = () => {
  const navigate = useNavigate();
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState(null); // Added this line
  const [showAll, setShowAll] = useState(false);
  const [allTractors, setAllTractors] = useState([]);
  const sliderRef = useRef(null); // Added this line
  const ITEMS_TO_SHOW = 8;

  const handleViewMore = () => {
    navigate('/tractors');  // This navigates to the AllTractors page
  };



  useEffect(() => {
    fetchTractors();
  }, []);

  const fetchTractors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stock/popular', {
        params: {
          status: 'active',
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
      });
      setAllTractors(response.data.tractors);
      setTractors(response.data.tractors.slice(0, ITEMS_TO_SHOW));
    } catch (err) {
      setError('Failed to fetch tractors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (tractor) => {
    setSelectedTractor(tractor);
    setOpenContactForm(true);
  };

  const handleViewToggle = () => {
    if (showAll) {
      setTractors(allTractors.slice(0, ITEMS_TO_SHOW));
      setShowAll(false);
    } else {
      setTractors(allTractors);
      setShowAll(true);
    }
  };

  const settings = {
    dots: false,
    infinite: !showAll,
    speed: 500,
    slidesToShow: showAll ? 4 : 4,
    slidesToScroll: 1,
    rows: showAll ? Math.ceil(tractors.length / 4) : 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="xl">
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
          Popular Tractors
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
          
          {!loading && tractors.length > 0 && !showAll && (
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
                  zIndex: 2
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
                  zIndex: 2
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          {allTractors.length > ITEMS_TO_SHOW && (
            <Button
              onClick={handleViewToggle}
              sx={{
                color: '#116978',
                borderColor: '#116978',
                borderStyle: 'dashed',
                borderWidth: '1px',
                borderRadius: '4px',
                px: 4,
                '&:hover': {
                  borderColor:'#116978',
                  bgcolor: 'rgba(0,152,219,0.05)',
                },
              }}
            >
              {showAll ? 'View Less' : 'View More'}
            </Button>
          )}
        </Box>

        <ContactSellerForm
          open={openContactForm}
          onClose={() => {
            setOpenContactForm(false);
            setSelectedTractor(null);
          }}
          tractor={selectedTractor}
        />
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
                borderColor:'#116978',
                bgcolor: 'rgba(0,152,219,0.05)',
              },
            }}
          >
            View More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularTractor;
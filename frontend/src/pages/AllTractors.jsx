// src/components/AllTractors.jsx
import React, { useState, useEffect } from 'react';
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
  Share as ShareIcon
} from '@mui/icons-material';
import axios from 'axios';
import ContactSellerForm from './ContactSellerForm';

// Fallback images array
import tractor1 from '../images/Tractor_listing1.png';
import tractor2 from '../images/Tractor_listing2.png';
import tractor3 from '../images/Tractor_listing3.png';
import tractor4 from '../images/Tractor_listing6.png';
import tractor5 from '../images/Tractor_listing4.png';
import tractor6 from '../images/Tractor_listing5.png';

const tractorImages = [tractor1, tractor2, tractor3, tractor4, tractor5, tractor6];

const TractorCard = ({ tractor, onContactClick }) => {
  const fallbackImage = '/tractor-placeholder.png';
  const randomTractor = React.useMemo(() => {
    const randomIndex = Math.floor(Math.random() * tractorImages.length);
    return tractorImages[randomIndex];
  }, []);

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-5px)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: 3
      }
    }}>
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
          >
            <FavoriteBorder />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {tractor.brand} {tractor.model}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
              {tractor.district}, {tractor.state}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Year: {tractor.registrationYear}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Hours: {tractor.hours || 'NA'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              HP: {tractor.horsePower}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            ₹ {tractor.sellPrice?.toLocaleString('en-IN')} INR*
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => onContactClick(tractor)}
            sx={{
              bgcolor: '#0098DB',
              '&:hover': {
                bgcolor: '#0087c4'
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

const AllTractors = () => {
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchAllTractors();
  }, [page]);

  const fetchAllTractors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/stock/all`, {
        params: {
          page,
          limit: 12,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
      });

      if (response.data.success) {
        if (page === 1) {
          setTractors(response.data.tractors);
        } else {
          setTractors(prev => [...prev, ...response.data.tractors]);
        }
        setHasMore(response.data.tractors.length === 12);
      } else {
        setError('Failed to load tractors');
      }
    } catch (err) {
      console.error('Error fetching tractors:', err);
      setError('Failed to load tractors');
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (tractor) => {
    setSelectedTractor(tractor);
    setOpenContactForm(true);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
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
              backgroundColor: '#0098DB',
            }
          }}
        >
          All Available Tractors
        </Typography>

        <Grid container spacing={3}>
          {tractors.map((tractor) => (
            <Grid item xs={12} sm={6} md={4} key={tractor._id}>
              <TractorCard 
                tractor={tractor}
                onContactClick={handleContactClick}
              />
            </Grid>
          ))}
          
          {loading && (
            Array(3).fill(null).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                <LoadingSkeleton />
              </Grid>
            ))
          )}
        </Grid>

        {hasMore && !loading && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              onClick={handleLoadMore}
              variant="outlined"
              sx={{
                color: '#0098DB',
                borderColor: '#0098DB',
                '&:hover': {
                  borderColor: '#0087c4',
                  bgcolor: 'rgba(0,152,219,0.05)',
                },
              }}
            >
              Load More
            </Button>
          </Box>
        )}

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

export default AllTractors;
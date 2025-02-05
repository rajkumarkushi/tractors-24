// src/components/SearchResults.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  IconButton,
  Skeleton
} from '@mui/material';
import {
  FavoriteBorder,
  LocationOn,
  Share as ShareIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ tractors, loading, error }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!tractors?.length) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography align="center" variant="h6" color="text.secondary">
          No tractors found matching your criteria
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Search Results ({tractors.length} tractors found)
      </Typography>

      <Grid container spacing={3}>
        {tractors.map((tractor) => (
          <Grid item xs={12} sm={6} md={4} key={tractor._id}>
            <Card
              sx={{
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
              onClick={() => navigate(`/tractor/${tractor._id}`)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={tractor.images?.[0] || '/tractor-placeholder.png'}
                  alt={tractor.brand}
                  sx={{ objectFit: 'cover' }}
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
                      // Add to favorites logic
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
                      // Share logic
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
                {tractor.condition === 'new' && (
                  <Chip
                    label="New"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {tractor.brand} {tractor.model}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{ fontSize: 16, verticalAlign: 'text-bottom' }} />
                    {tractor.district}, {tractor.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    HP: {tractor.horsePower} | Year: {tractor.registrationYear}
                  </Typography>
                </Box>

                <Typography variant="h6" color="primary" gutterBottom>
                  ₹ {tractor.sellPrice?.toLocaleString('en-IN')} INR*
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Contact seller logic
                  }}
                  sx={{
                    bgcolor: '#0098DB',
                    '&:hover': { bgcolor: '#0087c4' }
                  }}
                >
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
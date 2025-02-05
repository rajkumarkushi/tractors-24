import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';    
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import your vehicle images
import vehicle1 from '../images/Tractor_listing1.png';
import vehicle2 from '../images/Tractor_listing2.png';
import vehicle3 from '../images/Tractor_listing3.png';
import vehicle4 from '../images/Tractor_listing1.png';
import vehicle5 from '../images/Tractor_listing2.png';
import vehicle6 from '../images/Tractor_listing3.png';

function BrandDetails() {
  const { brandName} = useParams();

  // This is a mock data, you should replace it with real data from your backend
  const vehicles = [
    { id: 1, name: 'Vehicle 1', image: vehicle1 },
    { id: 2, name: 'Vehicle 2', image: vehicle2 },
    { id: 3, name: 'Vehicle 3', image: vehicle3 },
    { id: 4, name: 'Vehicle 4', image: vehicle4 },
    { id: 5, name: 'Vehicle 5', image: vehicle5 },
    { id: 6, name: 'Vehicle 6', image: vehicle6 },
  ];

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
      <Container>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 ,color:"#116978"}}
        >
          Back to Brands
        </Button>
        <Typography variant="h4" sx={{ mb: 4 }}>
          {brandName} Vehicles
        </Typography>
        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={vehicle.image}
                  alt={vehicle.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {vehicle.name}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{color:"#fff",
                      bgcolor:"#116978"
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default BrandDetails;
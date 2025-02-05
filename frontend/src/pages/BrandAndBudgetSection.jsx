import React, { useState } from 'react';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useNavigate } from 'react-router-dom';
import eicher from '../images/Eicher-logo.jpg';
import forcemotors from '../images/Force_Motors_Logo.jpg';
import ford from '../images/Ford.png';
import tractor1 from '../images/Tractor1.png';
import escort from '../images/escorts-logo-.png';
import hindustan from '../images/hindustan-motors-logo.png';
import hino from '../images/hino.png';
import hmt from '../images/hmt-logo.jpg';
import johndeer from '../images/john-deere-logo.jpg';
import mahindra from '../images/mahindra-logo.jpg';
import silice from '../images/silice.png';
import swaraj from '../images/swaraj-logo-.png';
import volvo from '../images/volvo.svg';
import captain from '../images/captain.png';
import montra from '../images/montra.jpeg';
import Maxgreen from '../images/maxgreen.jpeg';





const BrandAndBudgetSection = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('Brand');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const budgets = [
    { range: 'Under 5 Lakh', min: 0, max: 500000 },
    { range: '5-10 Lakh', min: 500000, max: 1000000 },
    { range: '10-15 Lakh', min: 1000000, max: 1500000 },
    { range: '15-20 Lakh', min: 1500000, max: 2000000 },
    { range: 'Above 20 Lakh', min: 2000000, max: Infinity },
  ];

  const brands = [
    { name: 'Hindustan Tractors', logo: hindustan },
    { name: 'EICHER', logo: eicher },
    { name: 'Ford', logo: ford },
    { name: 'MAHINDRA', logo: mahindra},
    { name: 'Escort', logo: escort },
    { name: 'John Deer', logo: johndeer },
    { name: 'HMT', logo: hmt },
    { name: 'FORCE MOTORS', logo: forcemotors },
    { name: 'Swaraj', logo: swaraj },
    { name: 'Volvo', logo: volvo },
    { name: 'Silice', logo: silice },
    { name: 'Hino', logo: hino },
    { name: 'Captain', logo: captain }, 
    { name: 'Maxgreen', logo: Maxgreen }, 
    { name: 'Montra', logo: montra },
  ];

  const handleFilterClick = (label) => {
    setActiveFilter(label);
    setSelectedBudget(null);
  };

  const handleBrandClick = (brandName) => {
    navigate(`/brand/${brandName}`);
  };

  const handleBudgetClick = (budget) => {
    navigate(`/budget/${budget}`);
  };

  const handleViewMore = () => {
    setShowAllBrands((prev) => !prev);
  };

  const visibleBrands = showAllBrands ? brands : brands.slice(0, 10);

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 0.2 }}>
      <Container maxWidth="lg">
        {/* Filter Buttons */}
        <Box sx={{ mt: 6, mb: 8, display: 'flex', gap: 2 }}>
          {[
            { icon: <LocalOfferOutlinedIcon />, label: 'Brand' },
            { icon: <CalendarTodayOutlinedIcon />, label: 'Budget' },
          ].map((filter, index) => (
            <Button
              key={index}
              startIcon={filter.icon}
              onClick={() => handleFilterClick(filter.label)}
              sx={{
                bgcolor: activeFilter === filter.label ? "#116978" : '#FFF',
                color: activeFilter === filter.label ? '#FFF' : "#116978",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: activeFilter === filter.label ? '#E8F4FF' : '#f5f5f5',
                },
              }}
            >
              {filter.label}
            </Button>
          ))}
        </Box>

        {/* Brand Section */}
        {activeFilter === 'Brand' && (
         <Grid container spacing={3}>
         {visibleBrands.map((brand, index) => (
           <Grid
             item
             xs={12}
             sm={6}
             md={2.4} // For 5 cards in a row
             key={index}
             sx={{
               opacity: 0,
               transform: 'translateX(50px)',
               animation: `slideIn 1s ease-in-out ${index * 0.1}s forwards`,
               flexBasis: '20%', // Ensures 5 cards in a row
               maxWidth: '20%',
             }}
           >
             <Card
               onClick={() => handleBrandClick(brand.name)}
               sx={{
                 p: 2,
                 textAlign: 'center',
                 cursor: 'pointer',
                 borderRadius: 2,
                 boxShadow: 3,
                 transition: 'transform 0.3s, box-shadow 0.3s',
                 '&:hover': {
                   transform: 'scale(1.05)',
                   boxShadow: 6,
                 },
               }}
             >
               <Box
                 sx={{
                   height: 60,
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   mb: 1.5,
                 }}
               >
                 <img
                   src={brand.logo}
                   alt={brand.name}
                   style={{
                     maxWidth: '70%',
                     maxHeight: '100%',
                     objectFit: 'contain',
                   }}
                 />
               </Box>
               <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                 {brand.name}
               </Typography>
             </Card>
           </Grid>
         ))}
       </Grid>
        )}

        {/* View More Button for Brand Section */}
        {activeFilter === 'Brand' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={handleViewMore}
              sx={{
                px: 5,
                py: 1.5,
                color: '#116978',
                borderColor: '#116978',
                '&:hover': {
                  bgcolor: '#E8F4FF',
                },
              }}
            >
              {showAllBrands ? 'View Less' : 'View More'}
            </Button>
          </Box>
        )}

        {/* Budget Section */}
        {activeFilter === 'Budget' && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Select Budget Range
            </Typography>
            <Grid container spacing={3}>
              {budgets.map((budget, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  sx={{
                    opacity: 0,
                    transform: 'translateX(50px)',
                    animation: `slideIn 1s ease-in-out ${index * 0.3}s forwards`,
                  }}
                >
                  <Card
                    onClick={() => handleBudgetClick(budget.range)}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                      bgcolor: selectedBudget === budget ? '#B3E5FC' : '#FFF',
                      border: '1px solid',
                      borderColor: selectedBudget === budget ? '#039BE5' : '#E0E0E0',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: selectedBudget === budget ? '#039BE5' : 'text.primary',
                        fontWeight: selectedBudget === budget ? 'bold' : 'normal',
                      }}
                    >
                      {budget.range}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Animation styles */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default BrandAndBudgetSection;

import {
  AccountBalanceOutlined,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AssessmentOutlined,
  BusinessOutlined,
  CalculateOutlined,
  CameraAlt,
  CardGiftcardOutlined,
  CompareOutlined,
  Facebook,
  GavelOutlined,
  LocalGasStation,
  LocalShippingOutlined,
  LocationOn,
  Pinterest,
  SellOutlined,
  Speed,
  Twitter,
  VpnKey,
  YouTube
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { StyledCard } from './StyledComponents';
import LocationSearch from './tractors/LocationSearch';
// import NestedLocation from './tractors/NestedLocationSearch';


import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';


import tractor1 from '../images/Tractor1.png';


import { default as tractorlist1, default as tractorlist4 } from '../images/Tractor_listing1.png';
import { default as tractorlist2, default as tractorlist5 } from '../images/Tractor_listing2.png';
import { default as tractorlist3, default as tractorlist6 } from '../images/Tractor_listing3.png';

import Navbar from './Navbar';
import Footer from './Footer'
import Hero from './Hero';
import BrandAndBudgetSection from './BrandAndBudgetSection';
import Populartractors from './Populartractor12';
import Recentlylistedtractors from './RecentlyListedTractors';
import Recommendedtractors from './Recommendedtractors';
import EMICalculator from './EmiCalculator';
import FAQ from './Faq';

import { keyframes } from '@mui/system';

//for brands section animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#003B8F',
  boxShadow: 'none',
});

const NavButton = styled(Button)({
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

function Header() {
  const [location, setLocation] = React.useState('Chennai');
  const [language, setLanguage] = React.useState('English');
  const [activeFilter, setActiveFilter] = useState('Brand');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const sliderRef = useRef(null);

  const navigate = useNavigate();


  const tractors = [
    { name: 'sonalika 475 DI', image: tractor1 },
    { name: 'sonalika 475 DI', image: tractor1 },
    { name: 'MAHINDRA 575 DI', image: tractorlist2 },
    { name: 'SONALIKA 750 DI', image: tractorlist3 },
    { name: 'JOHN DEERE 5045D', image: tractorlist1 },
    { name: 'NEW HOLLAND 3630', image: tractorlist4 },
    { name: 'MASSEY FERGUSON 241', image: tractorlist5 },
    { name: 'KUBOTA MU4501', image: tractorlist6 },
  ];

  const filteredTractors = selectedBudget
    ? tractors.filter(tractor => tractor.price >= selectedBudget.min && tractor.price < selectedBudget.max)
    : [];

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

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledCard>

        {/* navbar */}
        <Navbar />

        {/* hero section */}
        <Hero />
        <Populartractors />

        <BrandAndBudgetSection />

        <LocationSearch />




        {/* recently listed tractors SECTION*/}
        <Recentlylistedtractors />

        {/* recommended tractors section */}
        <Recommendedtractors />

        <FAQ />



        {/* Filter Categories Section */}
        <Box sx={{ py: 4, bgcolor: '#fff' }}>
          <Container>
            <Grid container spacing={4}>
              {/* Fuel Type Column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Hours Driven
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    '<500 hours driven tractors',
                    '500-1000 hours driven tractors',
                    '1000-2000 hours driven tractors',
                    '2000-5000 hours driven tractors',
                    '5000-10000 hours driven tractors',
                    '10000-20000 hours driven tractors',
                    '20000+ hours driven tractors',
                  ].map((item, index) => (
                    <Link
                      key={index}
                      component="button"
                      underline="hover"
                      sx={{
                        color: '#116978',
                        textAlign: 'left',
                        '&:hover': {
                          color: '#168d91' ,
                        },
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </Grid>
              {/* Budget Column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Budget
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    'Used tractors under 5 lakhs in india',
                    'Used tractors 5 lakhs to 10 lakhs in india',
                    'Used tractors 10 lakhs to 15 lakhs in india',
                    'Used tractors 15 lakhs to 20 lakhs in india',
                    'Used tractors above 20 lakhs in india'
                  ].map((item, index) => (
                    <Link
                      key={index}
                      component="button"
                      underline="hover"
                      sx={{
                        color: '#116978',
                        textAlign: 'left',
                        '&:hover': {
                          color: '#168d91',
                        },
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </Grid>

              {/* Owner Type Column */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Owner Type
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    'Used first owner tractors in india',
                    'Used second owner tractors in india',
                    'Used third owner tractors in india'
                  ].map((item, index) => (
                    <Link
                      key={index}
                      component="button"
                      underline="hover"
                      sx={{
                        color: '#116978',
                        textAlign: 'left',
                        '&:hover': {
                          color: '#168d91',
                        },
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services and Footer Section */}
        <Box sx={{ py: 4, bgcolor: '#f5f5f5' }}>
          <Container>
            {/* Services Grid */}
            <Grid container spacing={2}>
              {[
                { icon: <LocalShippingOutlined />, title: 'Buy Tractors' },
                { icon: <SellOutlined />, title: 'Sell Tractors' },
                { icon: <GavelOutlined />, title: 'Auction' },
                { icon: <AccountBalanceOutlined />, title: 'Loan' },
                { icon: <CalculateOutlined />, title: 'EMI Calculator', component: EMICalculator },
                { icon: <AssessmentOutlined />, title: 'Tractor Valuation' },
                { icon: <CompareOutlined />, title: 'Compare' },
                { icon: <BusinessOutlined />, title: 'Tractor Dealers' },
                { icon: <CardGiftcardOutlined />, title: 'Offers' }
              ].map((service, index) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <Box sx={{ color: '#116978', mb: 1 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="body2" align="center">
                      {service.title}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Social Media and Links */}
            <Box sx={{ mt: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Get in touch
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" component="a" href="#facebook">
                    <Facebook />
                  </IconButton>
                  <IconButton color="primary" component="a" href="#twitter">
                    <Twitter />
                  </IconButton>
                  <IconButton color="error" component="a" href="#pinterest">
                    <Pinterest />
                  </IconButton>
                  <IconButton color="error" component="a" href="#youtube">
                    <YouTube />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
        {/* footer component */}
        <Footer />

      </StyledCard>
    </Box>
  );
}

export default Header;



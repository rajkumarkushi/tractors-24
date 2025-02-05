import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  IconButton,
  useTheme,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  useMediaQuery
} from '@mui/material';
import {
  LocationOn,
  ChevronLeft,
  ChevronRight,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import axios from 'axios';
import locationData from './Location.json';
// import hyd from '../../images/images.png';

const LocationSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollContainer = useRef(null);
  
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      const newScrollPosition = scrollContainer.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainer.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedDistrict('');
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/search-tractors', {
        params: {
          state: selectedState?.state,
          district: selectedDistrict
        }
      });

      setSearchResults(response.data);
      handleClose();
      
    } catch (error) {
      console.error('Search failed:', error);
      setError('Failed to search tractors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const LocationCard = ({ state }) => (
    <Card
      sx={{
        minWidth: 280,
        height: 320,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        bgcolor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        }
      }}
      onClick={() => handleStateClick(state)}
    >
      <Box
        sx={{
          height: 160,
          bgcolor:'#116978',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          component="img"
          src={state.logo}
          alt={`${state.state} logo`}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            borderRadius: '50%',
            bgcolor: 'white',
            objectFit: 'contain',
          }}
        />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          {state.state}
        </Typography>
      </Box>

      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: 1,
          }}
        >
          Available Districts
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color:'#116978',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          {state.districts.length}
        </Typography>
      </Box>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}
      >
        <LocationOn sx={{ color:'#116978', mr: 1 }} />
        <Typography
          variant="h5"
          sx={{
            color: '#116978',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          SEARCH TRACTOR DEALERS BY STATE
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {!isMobile && showLeftScroll && (
          <IconButton
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: 'white' }
            }}
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <Box
          ref={scrollContainer}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            px: 2,
            py: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
          }}
          onScroll={checkScrollButtons}
        >
          {locationData.states.map((state) => (
            <Box key={state.state} sx={{ flexShrink: 0 }}>
              <LocationCard state={state} />
            </Box>
          ))}
        </Box>

        {!isMobile && showRightScroll && (
          <IconButton
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: 'white' }
            }}
            onClick={() => handleScroll('right')}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#116978',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">
            Select District in {selectedState?.state}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ p: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{color:'#116978'}}
              >Select District</InputLabel>
              <Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                label="Select District"
              >
                {selectedState?.districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={!selectedDistrict || loading}
              sx={{
                bgcolor: '#116978',
                '&:hover': {
                  bgcolor:'#116978'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Tractors'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {searchResults && (
        <Box sx={{ mt: 4 }}>
          {/* Implement your search results UI here */}
        </Box>
      )}
    </Container>
  );
};

export default LocationSearch;


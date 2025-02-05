import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  styled,
  Slide,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import api from '../../services/axios';

// Styled Components
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    transition: 'all 0.3s ease',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

// Constants
const brands = [
  'Mahindra',
  'TATA',
  'John Deere',
  'New Holland',
  'Massey Ferguson',
  'Sonalika',
  'Eicher',
  'Others'
];

const states = [
  'Madhya Pradesh',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Bihar'
];
const insuranceStatuses = ['Active', 'Expired', 'None'];
const categories = [
  'popular',
  'recently-listed',
  'recommended'
];

// Initial form state
const initialFormState = {
  brand: '',
  name: '',
  model: '',
  registrationYear: '',
  sellerContact: '',
  sellerEmail: '',
  horsePower: '',
  rearTyre: '',
  hours: '',
  sellPrice: '',
  showroomPrice: '',
  insuranceStatus: '',
  registrationNumber: '',
  description: '',
  state: '',
  district: '',
  pincode: '',
  category: '',
};

const StockDashboard = () => {
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(initialFormState);
  const [selectedTractor, setSelectedTractor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch Tractors
  const fetchTractors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('http://localhost:5000/api/stock/all');
      setTractors(data.tractors);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tractors');
      console.error('Error fetching tractors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTractors();
  }, []);

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = { ...formData };

      if (selectedTractor) {
        await api.put(`http://localhost:5000/api/stock/update/${selectedTractor.id}`, formDataToSend);
      } else {
        await api.post('http://localhost:5000/api/stock/add', formDataToSend);
      }

      fetchTractors();
      handleCloseDialog();
    } catch (error) {
      setError(selectedTractor ? 'Failed to update tractor' : 'Failed to add tractor');
      console.log('Error:', error,formData);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tractorId) => {
    try {
      setLoading(true);
      await api.delete(`http://localhost:5000/api/stock/delete/${tractorId}`);
      fetchTractors();
      setDeleteDialogOpen(false);
    } catch (err) {
      setError('Failed to delete tractor');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTractor(null);
    setFormData(initialFormState);
    setError(null);
  };

  const handleEdit = (tractor) => {
    setSelectedTractor(tractor);
    setFormData(tractor);
    setOpenDialog(true);
  };

  const filteredTractors = tractors.filter(tractor => 
    tractor.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tractor.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tractor.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Stock Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledTextField
            placeholder="Search tractors..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              borderRadius: 2,
              bgcolor:'#116978',
              '&:hover': {
                bgcolor:'#168d91',
              }
            }}
          >
            Add New Tractor
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tractor Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredTractors.map((tractor) => (
            <Grid item xs={12} sm={6} md={4} key={tractor.id}>
              <StyledCard>
                <CardContent>
                  {/* Tractor Images */}
                  {tractor.images && tractor.images.length > 0 && (
                    <Box sx={{ mb: 2, position: 'relative', height: 200 }}>
                      <img
                        src={tractor.images[0]}
                        alt={`${tractor.brand} ${tractor.model}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 8
                        }}
                      />
                    </Box>
                  )}

                  {/* Tractor Details */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {tractor.brand} {tractor.model}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      Registration: {tractor.registrationNumber}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Price: ₹{tractor.sellPrice?.toLocaleString()}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      HP: {tractor.horsePower}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Hours Used: {tractor.hours}
                    </Typography>
                    <Typography color="textSecondary">
                      Location: {tractor.district}, {tractor.state}
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ 
                    mt: 2, 
                    display: 'flex', 
                    gap: 1,
                    borderTop: '1px solid #eee',
                    pt: 2
                  }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(tractor)}
                      sx={{ 
                        color:'#116978',

                        '&:hover': { 
                          bgcolor: '#116978',
                          color: 'white'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => {
                        setSelectedTractor(tractor);
                        setDeleteDialogOpen(true);
                      }}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: 'error.light',
                          color: 'white'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <StyledDialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {selectedTractor ? 'Edit Tractor' : 'Add New Tractor'}
          </Typography>
          <IconButton 
            onClick={handleCloseDialog}
            sx={{ 
              '&:hover': { 
                bgcolor: 'error.light',
                color: 'white'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  select
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Model and Registration */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Registration Number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="registration Year"
                  name="registrationYear"
                  value={formData.registrationYear}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Technical Details */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Horse Power"
                  name="horsePower"
                  type="number"
                  value={formData.horsePower}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Hours Used"
                  name="hours"
                  type="number"
                  value={formData.hours}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="rearTyre"
                  name="rearTyre"
                  type="rearTyre"
                  value={formData.rearTyre}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              {/* Location Details */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  select
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Seller Contact Details */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Seller Contact"
                  name="sellerContact"
                  value={formData.sellerContact}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Seller Email"
                  name="sellerEmail"
                  type="email"
                  value={formData.sellerEmail}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Price Information */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Selling Price"
                  name="sellPrice"
                  type="number"
                  value={formData.sellPrice}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="showroom Price"
                  name="showroomPrice"
                  type="number"
                  value={formData.showroomPrice}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>

              {/* Insurance Status */}
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  select
                  fullWidth
                  label="Insurance Status"
                  name="insuranceStatus"
                  value={formData.insuranceStatus}
                  onChange={handleChange}
                  required
                >
                {insuranceStatuses.map((insuranceStatus) => (
                    <MenuItem key={insuranceStatus} value={insuranceStatus}>
                      {insuranceStatus}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #eee' }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              borderRadius: 2,
              px: 4,
              bgcolor: theme => theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme => theme.palette.primary.dark,
              }
            }}
          >
            {selectedTractor ? 'Update Tractor' : 'Add Tractor'}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this tractor? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(selectedTractor?.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockDashboard;
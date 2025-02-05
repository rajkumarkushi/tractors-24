import React, { useState, useEffect } from 'react';
import {
  Grid, Box, Card, CardContent, Typography, Button, CircularProgress, Tabs, Tab, Divider, Snackbar, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { Visibility, Edit, Delete, Add } from '@mui/icons-material';
import { styled } from '@mui/system';

const VehicleInfo = () => {
  const [vehicleData, setVehicleData] = useState({ newTractors: [], secondHandTractors: [] });
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Fetching mock vehicle data (replace with actual API call)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = {
          newTractors: [
            { id: 'N12345', model: 'John Deere 5050D', year: '2023', price: '$30,000', status: 'Available' },
            { id: 'N12346', model: 'Mahindra 575 DI', year: '2023', price: '$27,500', status: 'Available' },
          ],
          secondHandTractors: [
            { id: 'V12345', model: 'Sonalika RX 55', year: '2019', price: '$24,000', status: 'Available' },
            { id: 'V12346', model: 'New Holland 3032 NX', year: '2021', price: '$28,000', status: 'Sold' },
          ]
        };
        setVehicleData(data);
      } catch (error) {
        console.error('Error fetching data', error);
        setSnackbarMessage("Failed to load data");
        setOpenSnackbar(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleOpenDialog = (vehicle = null, isEditMode = false) => {
    setIsEdit(isEditMode);
    setCurrentVehicle(vehicle);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentVehicle(null);
  };

  const handleSave = () => {
    setSnackbarMessage(isEdit ? 'Vehicle updated successfully' : 'New vehicle added successfully');
    setOpenSnackbar(true);
    handleCloseDialog();
  };

  const handleDelete = (vehicleId) => {
    setSnackbarMessage('Vehicle deleted successfully');
    setOpenSnackbar(true);
  };

  // Styled components for modern UI look
  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
    },
  }));

  const StyledTabs = styled(Tabs)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginBottom: '20px',
    '& .Mui-selected': {
      color: '#1976d2',
      fontWeight: 'bold',
    },
  }));

  const VehicleTable = ({ data }) => (
    <Grid container spacing={2}>
      {data.map((vehicle, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{vehicle.model}</Typography>
              <Typography variant="body2" color="text.secondary">Year: {vehicle.year}</Typography>
              <Typography variant="body2" color="text.secondary">Price: {vehicle.price}</Typography>
              <Typography variant="body2" color="text.secondary">Status: {vehicle.status}</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Tooltip title="View Details">
                  <StyledButton
                    onClick={() => handleOpenDialog(vehicle, false)}
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    <Visibility sx={{ marginRight: 1 }} />
                    View
                  </StyledButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <StyledButton
                    onClick={() => handleOpenDialog(vehicle, true)}
                    variant="outlined"
                    size="small"
                    color='#116978'
                   sx={{color:'#116978'}} 
                  >
                    <Edit sx={{ marginRight: 1 ,color:'#116978'}} />
                    Edit
                  </StyledButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <StyledButton
                    onClick={() => handleDelete(vehicle.id)}
                    variant="outlined"
                    size="small"
                    color="error"
                  >
                    <Delete sx={{ marginRight: 1 }} />
                    Delete
                  </StyledButton>
                </Tooltip>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid container spacing={3} sx={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>Vehicle Information</Typography>
          <StyledButton
            onClick={() => handleOpenDialog(null, false)}
            variant="contained"
            color="primary"
            sx={{bgcolor:'#116978'}}
          >
            <Add sx={{ marginRight: 1 }} />
            Add New Vehicle
          </StyledButton>
        </Box>

        {/* Tabs for New and Second-Hand Tractors */}
        <StyledTabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          variant="fullWidth"
        >
          <Tab  label="New Tractors" />
          <Tab label="Second-Hand Tractors" />
        </StyledTabs>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Loading Indicator */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress color="primary" size={60} />
          </Box>
        ) : (
          <Card sx={{ boxShadow: 10, borderRadius: 3, backgroundColor: '#f9fafb' }}>
            <CardContent>
              <VehicleTable data={tabIndex === 0 ? vehicleData.newTractors : vehicleData.secondHandTractors} />
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#43a047',
            color: '#fff',
            borderRadius: 3,
            fontWeight: 'bold',
          },
        }}
      />

      {/* Dialog for Add/Edit Vehicle */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Model"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentVehicle?.model || ''}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
          />
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentVehicle?.year || ''}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, year: e.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentVehicle?.price || ''}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, price: e.target.value })}
          />
          <TextField
            label="Status"
            variant="outlined"
            fullWidth
            margin="normal"
            value={currentVehicle?.status || ''}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseDialog} color="secondary">Cancel</StyledButton>
          <StyledButton onClick={handleSave} color="primary">{isEdit ? 'Save Changes' : 'Add Vehicle'}</StyledButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default VehicleInfo;


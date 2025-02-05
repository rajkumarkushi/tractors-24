import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  InputAdornment,
  Alert,
  Container,
  Card,
  CardContent,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Person,
  DirectionsCar,
  Security,
  ArrowForward,
  ArrowBack,
  Upload,
} from '@mui/icons-material';

const steps = ['Personal Details', 'Tractor Details', 'Insurance Preferences'];

const PersonalDetailsForm = ({ formData, setFormData }) => {
  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          Personal Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              inputProps={{
                maxLength: 10,
                pattern: '[0-9]*'
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              variant="outlined"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const TractorDetailsForm = ({ formData, setFormData }) => {
  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
          Tractor Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Tractor Model</InputLabel>
              <Select
                value={formData.tractorModel}
                onChange={(e) => setFormData({ ...formData, tractorModel: e.target.value })}
                label="Tractor Model"
              >
                <MenuItem value="model1">Mahindra 575 DI XP Plus</MenuItem>
                <MenuItem value="model2">Swaraj 855 FE</MenuItem>
                <MenuItem value="model3">John Deere 5310</MenuItem>
                <MenuItem value="model4">Massey Ferguson 241 DI</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Year of Manufacture</InputLabel>
              <Select
                value={formData.manufactureYear}
                onChange={(e) => setFormData({ ...formData, manufactureYear: e.target.value })}
                label="Year of Manufacture"
              >
                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Tractor Usage</InputLabel>
              <Select
                value={formData.tractorUsage}
                onChange={(e) => setFormData({ ...formData, tractorUsage: e.target.value })}
                label="Tractor Usage"
              >
                <MenuItem value="farming">Farming</MenuItem>
                <MenuItem value="construction">Construction</MenuItem>
                <MenuItem value="rental">Rental</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const InsurancePreferencesForm = ({ formData, setFormData }) => {
  const handleAddOnChange = (addon) => {
    const newAddOns = formData.addOns.includes(addon)
      ? formData.addOns.filter(item => item !== addon)
      : [...formData.addOns, addon];
    setFormData({ ...formData, addOns: newAddOns });
  };

  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
          Insurance Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Type of Insurance</InputLabel>
              <Select
                value={formData.insuranceType}
                onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                label="Type of Insurance"
              >
                <MenuItem value="comprehensive">Comprehensive</MenuItem>
                <MenuItem value="thirdParty">Third-Party</MenuItem>
                <MenuItem value="zeroDepreciation">Zero Depreciation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Coverage Amount"
              type="number"
              variant="outlined"
              value={formData.coverageAmount}
              onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Previous Insurance Details"
              variant="outlined"
              value={formData.previousInsurance}
              onChange={(e) => setFormData({ ...formData, previousInsurance: e.target.value })}
              placeholder="Insurer Name / Policy Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Preferred Insurance Provider</InputLabel>
              <Select
                value={formData.preferredProvider}
                onChange={(e) => setFormData({ ...formData, preferredProvider: e.target.value })}
                label="Preferred Insurance Provider"
              >
                <MenuItem value="provider1">HDFC ERGO</MenuItem>
                <MenuItem value="provider2">ICICI Lombard</MenuItem>
                <MenuItem value="provider3">Bajaj Allianz</MenuItem>
                <MenuItem value="provider4">New India Assurance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Add-on Covers
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.addOns.includes('engineProtection')}
                        onChange={() => handleAddOnChange('engineProtection')}
                      />
                    }
                    label="Engine Protection"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.addOns.includes('roadsideAssistance')}
                        onChange={() => handleAddOnChange('roadsideAssistance')}
                      />
                    }
                    label="Roadside Assistance"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.addOns.includes('lossOfUse')}
                        onChange={() => handleAddOnChange('lossOfUse')}
                      />
                    }
                    label="Loss of Use Cover"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referral Code (Optional)"
              variant="outlined"
              value={formData.referralCode}
              onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const InsuranceInquiry = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    tractorModel: '',
    manufactureYear: '',
    tractorUsage: '',
    insuranceType: '',
    coverageAmount: '',
    previousInsurance: '',
    preferredProvider: '',
    addOns: [],
    referralCode: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setActiveStep(steps.length);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetailsForm formData={formData} setFormData={setFormData} />;
      case 1:
        return <TractorDetailsForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <InsurancePreferencesForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ mb: 4 }}>
          Tractor Insurance Inquiry
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 4 }} />

        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Thank you for your insurance inquiry! Our team will contact you shortly.
            </Alert>
            <Button
              variant="contained"
              onClick={() => setActiveStep(0)}
              startIcon={<ArrowBack />}
            >
              Submit Another Inquiry
            </Button>
          </Box>
        ) : (
          <>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
              >
                {activeStep === steps.length - 1 ? 'Submit Inquiry' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default InsuranceInquiry;
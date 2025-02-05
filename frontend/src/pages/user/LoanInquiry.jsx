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
} from '@mui/material';
import {
  Person,
  AccountBalance,
  DirectionsCar,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

const steps = ['Personal Details', 'Loan Requirements', 'Tractor Details'];

const PersonalDetailsForm = ({ formData, setFormData }) => {
  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#116978' }} gutterBottom>
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
              label="Date of Birth"
              type="date"
              variant="outlined"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
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

const LoanRequirementsForm = ({ formData, setFormData }) => {
  return (
    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: '#116978' }} gutterBottom>
          <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
          Loan Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Loan Amount"
              type="number"
              variant="outlined"
              value={formData.loanAmount}
              onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Loan Tenure</InputLabel>
              <Select
                value={formData.loanTenure}
                onChange={(e) => setFormData({ ...formData, loanTenure: e.target.value })}
                label="Loan Tenure"
              >
                <MenuItem value={1}>1 Year</MenuItem>
                <MenuItem value={3}>3 Years</MenuItem>
                <MenuItem value={5}>5 Years</MenuItem>
                <MenuItem value={7}>7 Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Preferred EMI Amount"
              type="number"
              variant="outlined"
              value={formData.emiAmount}
              onChange={(e) => setFormData({ ...formData, emiAmount: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Employment Type</InputLabel>
              <Select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                label="Employment Type"
              >
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="business">Business Owner</MenuItem>
                <MenuItem value="salaried">Salaried</MenuItem>
                <MenuItem value="other">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Annual Income"
              type="number"
              variant="outlined"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Current Loan Status</InputLabel>
              <Select
                value={formData.currentLoanStatus}
                onChange={(e) => setFormData({ ...formData, currentLoanStatus: e.target.value })}
                label="Current Loan Status"
              >
                <MenuItem value="existing">Existing Loan</MenuItem>
                <MenuItem value="none">No Existing Loan</MenuItem>
              </Select>
            </FormControl>
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
          <Typography variant="h6" color="#116978" gutterBottom>
            <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
            Tractor Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined" >
                <InputLabel >Tractor Model</InputLabel>
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
                <InputLabel>Purpose of Tractor</InputLabel>
                <Select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  label="Purpose of Tractor"
                >
                  <MenuItem value="farming">Farming</MenuItem>
                  <MenuItem value="construction">Construction</MenuItem>
                  <MenuItem value="transportation">Transportation</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Preferred Bank</InputLabel>
                <Select
                  value={formData.preferredBank}
                  onChange={(e) => setFormData({ ...formData, preferredBank: e.target.value })}
                  label="Preferred Bank"
                >
                  <MenuItem value="sbi">State Bank of India</MenuItem>
                  <MenuItem value="hdfc">HDFC Bank</MenuItem>
                  <MenuItem value="icici">ICICI Bank</MenuItem>
                  <MenuItem value="axis">Axis Bank</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  
  // Update the initial state in LoanInquiry component
  const LoanInquiry = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      fullName: '',
      dob: '', // Changed from null to empty string
      mobile: '',
      email: '',
      address: '',
      loanAmount: '',
      loanTenure: '',
      emiAmount: '',
      employmentType: '',
      annualIncome: '',
      currentLoanStatus: '',
      tractorModel: '',
      manufactureYear: '',
      purpose: '',
      preferredBank: '',
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
          return <PersonalDetailsForm  formData={formData} setFormData={setFormData} />;
        case 1:
          return <LoanRequirementsForm formData={formData} setFormData={setFormData} />;
        case 2:
          return <TractorDetailsForm formData={formData} setFormData={setFormData} />;
        default:
          return null;
      }
    };
  
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom color='#116978' sx={{ mb: 4 }}>
            Tractor Loan Inquiry
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
                Thank you for your loan inquiry! Our team will contact you shortly.
              </Alert>
              <Button
                variant="contained"
                onClick={() => setActiveStep(0)}
                startIcon={<ArrowBack />}
                sx={{                  bgcolor:'#116978'
                }}
              >
                Submit Another Inquiry
              </Button>
            </Box>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 ,                  
}}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  color='#116978'
                  startIcon={<ArrowBack />}
                  sx={{color:'#116978'}}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  endIcon={activeStep === steps.length - 1 ? null : <ArrowForward />}
                  sx={{                  bgcolor:'#116978'
                  }}
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
  
  export default LoanInquiry;
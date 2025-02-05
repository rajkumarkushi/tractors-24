  import {
  ArrowForward as ArrowForwardIcon,
  Calculate as CalculateIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../utils/langaugeContext';


  const EMICalculator = ({ onClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { language, translateText } = useLanguage();
    const [translations, setTranslations] = useState({});


    const defaultTranslations = {
      calculatorTitle: 'Tractor Loan EMI Calculator',
      brand: 'Brand',
      model: 'Model',
      variant: 'Variant',
      city: 'City',
      loanAmount: 'Loan Amount',
      tenure: 'Tenure',
      months: 'months',
      interestRate: 'Interest Rate',
      year: 'Year',
      years: 'Years',
      emiBreakdown: 'EMI Breakdown',
      monthlyEmi: 'Monthly EMI',
      principalAmount: 'Principal Amount',
      interestAmount: 'Interest Amount',
      processingFee: 'Processing Fee',
      totalPayment: 'Total Payment',
      applyForLoan: 'Apply for Loan'
    };

    const translateContent = async () => {
      if (language === 'English') {
        setTranslations(defaultTranslations);
        return;
      }
  
      const translatedContent = {};
      for (const [key, value] of Object.entries(defaultTranslations)) {
        translatedContent[key] = await translateText(value, language);
      }
      setTranslations(translatedContent);
    };

    const [values, setValues] = useState({
      principal: 500000,
      tenure: 60,
      interestRate: 10.5,
      brand: '',
      model: '',
      variant: '',
      city: 'Chennai'
    });

    const [emiDetails, setEmiDetails] = useState({
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      processingFee: 0,
      firstEMIDate: ''
    });

    const [brands] = useState([
      { name: 'TATA', models: ['Model 1', 'Model 2'] },
      { name: 'Mahindra', models: ['Model A', 'Model B'] },
      { name: 'Eicher', models: ['Model X', 'Model Y'] },
      { name: 'John Deere', models: ['Model Alpha', 'Model Beta'] }
    ]);

    const calculateEMI = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/inquiries/calculate-emi', values);
        setEmiDetails(response.data);
      } catch (error) {
        console.error('EMI calculation failed:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {

      
      const debounceTimer = setTimeout(() => {
        calculateEMI();
      }, 500);

      return () => clearTimeout(debounceTimer);
    }, [values]);

    useEffect(() => {
      translateContent();
    }, [language]);
  

    const handleApplyLoan = () => {
      localStorage.setItem('loanApplication', JSON.stringify({
        ...values,
        ...emiDetails
      }));
      navigate('/loan');
      onClose();
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(value);
    };  return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: theme.palette.primary.main,
            color: 'white',
            p: 2,
            bgcolor:'#116978'

          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
              <CalculateIcon />
              <Typography variant="h6">{translations.calculatorTitle}</Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
              {/* Left Section - Inputs */}
              <Grid item xs={12} md={7}>
                <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>{translations.brand}</InputLabel>
                        <Select
                          value={values.brand}
                          onChange={(e) => setValues({ ...values, brand: e.target.value })}
                          label={translations.brand}
                        >
                          {brands.map((brand) => (
                            <MenuItem key={brand.name} value={brand.name}>{brand.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>{translations.model}</InputLabel>
                        <Select
                          value={values.model}
                          onChange={(e) => setValues({ ...values, model: e.target.value })}
                          label="Model"
                          disabled={!values.brand}
                        >
                          {brands.find(b => b.name === values.brand)?.models.map((model) => (
                            <MenuItem key={model} value={model}>{model}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label={translations.variant}
                        value={values.variant}
                        onChange={(e) => setValues({ ...values, variant: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="City"
                        value={values.city}
                        onChange={(e) => setValues({ ...values, city: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                    {translations.loanAmount}: {formatCurrency(values.principal)}
                    </Typography>
                    <Slider
                      value={values.principal}
                      onChange={(e, newValue) => setValues({ ...values, principal: newValue })}
                      min={100000}
                      max={10000000}
                      step={100000}
                      valueLabelDisplay="auto"
                      valueLabelFormat={formatCurrency}
                      sx={{ color: '#116978' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">₹1L</Typography>
                      <Typography variant="caption">₹1Cr</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {translations.tenure}: {values.tenure} {translations.months}
                    </Typography>
                    <Slider
                      value={values.tenure}
                      onChange={(e, newValue) => setValues({ ...values, tenure: newValue })}
                      min={12}
                      max={96}
                      valueLabelDisplay="auto"
                      sx={{ color: '#116978'}}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">1 {translations.year}</Typography>
                      <Typography variant="caption">8 {translations.years}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {translations.interestRate}: {values.interestRate}%
                    </Typography>
                    <Slider
                      value={values.interestRate}
                      onChange={(e, newValue) => setValues({ ...values, interestRate: newValue })}
                      min={5}
                      max={16}
                      step={0.1}
                      valueLabelDisplay="auto"
                      sx={{  color: '#116978'}}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">5%</Typography>
                      <Typography variant="caption">16%</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Right Section - Results */}
              <Grid item xs={12} md={5}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', bgcolor: '#f8f8f8' }}>
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h5" sx={{ mb: 4,  color: '#116978' }}>
                      {translations.emiBreakdown}
                      </Typography>

                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h4"  sx={{ mb: 1, color: '#116978' }}>
                          {formatCurrency(emiDetails.emi)}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {translations.monthlyEmi}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 3 }} />

                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            {translations.principalAmount}
                          </Typography>
                          <Typography variant="h6">
                            {formatCurrency(values.principal)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            {translations.interestAmount}
                          </Typography>
                          <Typography variant="h6">
                            {formatCurrency(emiDetails.totalInterest)}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            {translations.processingFee}
                          </Typography>
                          <Typography variant="h6">
                            {formatCurrency(emiDetails.processingFee)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                          {translations.totalPayment}
                          </Typography>
                          <Typography variant="h6">
                            {formatCurrency(emiDetails.totalPayment)}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleApplyLoan}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          mt: 2,
                          bgcolor: '#116978',
                          '&:hover': {
                            bgcolor: '#168d91'
                          }
                        }}
                      >
                        {translations.applyForLoan}
                      </Button>
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>
    );
  };

  export default EMICalculator;
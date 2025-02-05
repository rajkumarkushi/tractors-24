import {
  AccessTime,
  CardGiftcard,
  CheckCircle,
  Close as CloseIcon,
  ContentCopy,
  Email,
  Facebook,
  Share,
  WhatsApp
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../utils/langaugeContext';

const ReferralDashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [shareDialog, setShareDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { language, translateText } = useLanguage();
  const [translations, setTranslations] = useState({});

  const defaultTranslations = {
    referralProgram: 'Referral Program',
    inviteFriends: 'Invite friends and earn rewards for every successful referral',
    howItWorks: 'How It Works',
    shareCode: 'Share your unique referral code with friends',
    theySignUp: 'They sign up using your code',
    bothEarnRewards: 'Both you and your friend earn rewards!',
    earn: 'Earn ₹500',
    perReferral: 'for every successful referral',
    shareNow: 'Share Now',
    yourReferralCode: 'Your Referral Code',
    copyCode: 'Copy Code',
    totalEarnings: 'Total Earnings',
    from: 'From',
    successfulReferrals: 'successful referrals',
    successful: 'Successful',
    pending: 'Pending',
    shareVia: 'Share your referral code via:',
    codeCopied: 'Referral code copied to clipboard!',
    failedToLoad: 'Failed to load referral stats',
    shareTitle: 'Share Your Referral Code',
    copyLink: 'Copy Link',
    whatsApp: 'Whatsapp',
    email : 'Email',
    facebook: 'Facebook'
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

  
  useEffect(() => {
    translateContent();
  }, [language]);


  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/auth/referral-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch referral stats:', error);
      setSnackbar({
        open: true,
        message: translations.failedToLoad,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(stats.referralCode);
    setSnackbar({
      open: true,
      message: translations.codeCopied,
      severity: 'success'
    });
  };

  const shareViaWhatsApp = () => {
    const message = `Join Tractors24 using my referral code: ${stats?.referralCode} and get ₹200 welcome bonus! Sign up here: https://tractors24.com/register?ref=${stats?.referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  const shareViaEmail = () => {
    const subject = 'Join Tractors24 - Get ₹200 Welcome Bonus!';
    const body = `Join Tractors24 using my referral code: ${stats?.referralCode} and get ₹200 welcome bonus! Sign up here: https://tractors24.com/register?ref=${stats?.referralCode}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {translations.referralProgram}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {translations.inviteFriends}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* How it Works Card */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ bgcolor: "#116978", color: 'white' }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    {translations.howItWorks}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>1</Avatar>
                      <Typography>{translations.shareCode}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>2</Avatar>
                      <Typography>{translations.theySignUp}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>3</Avatar>
                      <Typography>{translations.bothEarnRewards}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" gutterBottom>
                      {translations.earn}
                    </Typography>
                    <Typography variant="subtitle1">
                     {translations.perReferral}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: 'white',
                        color: "#116978",
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.9)'
                        }
                      }}
                      onClick={() => setShareDialog(true)}
                      startIcon={<Share />}
                    >
                      {translations.shareNow}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Referral Code Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {translations.yourReferralCode}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: '#f8f8f8',
                  border: '2px dashed #ddd',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: 'monospace',
                    letterSpacing: 4,
                    fontWeight: 'bold',
                    color: theme.palette.primary.main
                  }}
                >
                  {stats?.referralCode}
                </Typography>
                <Tooltip title={translations.copyCode}>
                  <IconButton
                    onClick={copyReferralCode}
                    sx={{
                      mt: 1,
                      bgcolor:"#116978",
                      color: 'white',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark
                      }
                    }}
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Paper>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<WhatsApp />}
                    onClick={shareViaWhatsApp}
                    sx={{ borderRadius: 2 ,   borderColor:  "#116978"      ,           
                      color:"#116978"
                    }}
                  >
                    Whatsapp
                    {/* {translations.whatsApp} */}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Email />}
                    onClick={shareViaEmail}
                    sx={{ borderRadius: 2, borderColor:  "#116978"      ,           
                      color:"#116978" }}
                  >
                    Email
                    {/* {translations.email} */}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 ,color:'#116978' }}>
                    <Typography variant="h6">{translations.totalEarnings}</Typography>
                    <CardGiftcard color='#116978' />
                  </Box>
                  <Typography variant="h3" color='#116978'gutterBottom>
                    ₹{stats?.totalRewards || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {translations.from} {stats?.successfulReferrals || 0} {translations.successfulReferrals}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card elevation={0}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircle color="success" />
                    <Typography variant="subtitle1">{translations.successful}</Typography>
                  </Box>
                  <Typography variant="h4">{stats?.successfulReferrals || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card elevation={0}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime color="warning" />
                    <Typography variant="subtitle1">{translations.pending}</Typography>
                  </Box>
                  <Typography variant="h4">{stats?.pendingReferrals || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Share Dialog */}
      <Dialog
        open={shareDialog}
        onClose={() => setShareDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{translations.shareTitle}</Typography>
            <IconButton onClick={() => setShareDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {translations.shareVia}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<WhatsApp />}
                  onClick={shareViaWhatsApp}
                  fullWidth
                  sx={{ borderRadius: 2, py: 1 }}
                >
                  WhatsApp
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => {/* Implement Facebook sharing */}}
                  fullWidth
                  sx={{ borderRadius: 2, py: 1 }}
                >
                  Facebook
                  {/* {translations.facebook} */}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  onClick={shareViaEmail}
                  fullWidth
                  sx={{ borderRadius: 2, py: 1 }}
                >
                  Email
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopy />}
                  onClick={copyReferralCode}
                  fullWidth
                  sx={{ borderRadius: 2, py: 1 }}
                >
                  {translations.copyLink}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReferralDashboard;
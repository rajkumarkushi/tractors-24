import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  Paper,
  Divider,
  Avatar,
  Badge,
  IconButton
} from '@mui/material';
import DashboardCard from './DashboardCard';
import AuctionBanner from './AuctionBanner';
import LoanBanner from './LoanBanner';
import WalletWidget from './WalletWidget';
import KycStatus from './KycStatus';
import QuickActions from './QuickActions';
import Navbar from '../Navbar';
import {
  DirectionsCar,
  AccountBalance,
  Security,
  People,
  CardGiftcard,
  LocalOffer,
  ShoppingCart,
  Favorite,
  Payment,
  Assignment,
  Store,
  AccountBalanceWallet,
  Notifications
} from '@mui/icons-material';

const CustomerDashboard = () => {
  const [notifications, setNotifications] = useState(3);
  const [kycStatus, setKycStatus] = useState('pending');
  const [walletBalance, setWalletBalance] = useState(25000);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    {/* Navbar */}
    <Navbar />
      <Container maxWidth="xl">
        {/* Header Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
                >
                  JD
                </Avatar>
                <Box>
                  <Typography variant="h5">Welcome back, Antriksh</Typography>
                  <Typography color="textSecondary">
                    Last login: Today at 12:45 PM
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <IconButton>
                  <Badge badgeContent={notifications} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge badgeContent={2} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge badgeContent={5} color="error">
                    <Favorite />
                  </Badge>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AuctionBanner />
              </Grid>
              <Grid item xs={12} md={6}>
                <WalletWidget balance={walletBalance} />
              </Grid>
              <Grid item xs={12} md={6}>
                <KycStatus status={kycStatus} />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <LoanBanner />
            <QuickActions />
          </Grid>

          {/* Main Dashboard Cards */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Vehicle Management
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="Buy Vehicles"
                  icon={<Store />}
                  link="/buy-vehicles"
                  count={150}
                  description="Browse available vehicles"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="Sell Vehicles"
                  icon={<DirectionsCar />}
                  link="/sell-vehicle"
                  description="List your vehicle for sale"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="My Vehicles"
                  icon={<DirectionsCar />}
                  link="/my-vehicles"
                  count={2}
                  description="Manage your vehicles"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
              Financial Services
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="My Loans"
                  icon={<AccountBalance />}
                  link="/my-loans"
                  count={1}
                  description="Track your loan applications"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="Payment Details"
                  icon={<Payment />}
                  link="/payment-details"
                  description="Manage your payments"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="My Wallet"
                  icon={<AccountBalanceWallet />}
                  link="/wallet"
                  description={`Balance: ₹${walletBalance}`}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 'bold' }}>
              Account & Support
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="My Inquiries"
                  icon={<Assignment />}
                  link="/my-inquiries"
                  count={3}
                  description="Track your inquiries"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="KYC Verification"
                  icon={<Security />}
                  link="/kyc-verification"
                  status={kycStatus}
                  description="Complete your verification"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DashboardCard
                  title="Refer & Earn"
                  icon={<People />}
                  link="/refer-customer"
                  description="Invite friends and earn"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerDashboard;
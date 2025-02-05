import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Receipt,
  Person,
  Store,
  FitnessCenter,
  Download,
  FilterList,
  MoreVert,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: 
    status === 'paid' ? 'rgba(46, 204, 113, 0.2)' : 
    status === 'pending' ? 'rgba(255, 215, 0, 0.2)' : 
    'rgba(231, 76, 60, 0.2)',
  color: 
    status === 'paid' ? '#2ecc71' : 
    status === 'pending' ? '#FFD700' : 
    '#e74c3c',
}));

// Demo Data
const revenueData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 16000 },
  { month: 'Apr', revenue: 20000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 25000 },
];

const expenseDistribution = [
  { name: 'Staff Salary', value: 40 },
  { name: 'Equipment', value: 25 },
  { name: 'Maintenance', value: 20 },
  { name: 'Utilities', value: 15 },
];

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6'];

const recentPayments = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Member',
    amount: 500,
    date: '2024-02-15',
    status: 'paid',
    avatar: '/path/to/avatar1.jpg',
  },
  {
    id: 2,
    name: 'Fitness Equipment Co.',
    type: 'Vendor',
    amount: 2500,
    date: '2024-02-14',
    status: 'pending',
    avatar: null,
  },
  // Add more payment records...
];

export default function Finance() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderOverviewCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[
        {
          title: 'Total Revenue',
          amount: '$125,000',
          trend: '+15%',
          icon: <AccountBalance />,
          positive: true,
        },
        {
          title: 'Monthly Income',
          amount: '$25,000',
          trend: '+8%',
          icon: <TrendingUp />,
          positive: true,
        },
        {
          title: 'Expenses',
          amount: '$15,000',
          trend: '-3%',
          icon: <TrendingDown />,
          positive: false,
        },
        {
          title: 'Pending Payments',
          amount: '$5,000',
          trend: '12 pending',
          icon: <AttachMoney />,
          positive: null,
        },
      ].map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1, color: '#FFD700' }}>
                    {card.amount}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: card.positive ? 'success.main' : 
                             card.positive === false ? 'error.main' : 
                             'warning.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    {card.trend}
                  </Typography>
                </Box>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.2)' },
                  }}
                >
                  {card.icon}
                </IconButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  const renderRevenueChart = () => (
    <StyledCard sx={{ mb: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Revenue Overview</Typography>
          <Box display="flex" gap={1}>
            <Button
              startIcon={<FilterList />}
              variant="outlined"
              size="small"
              sx={{ borderColor: '#FFD700', color: '#FFD700' }}
            >
              Filter
            </Button>
            <Button
              startIcon={<Download />}
              variant="contained"
              size="small"
              sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
            >
              Export
            </Button>
          </Box>
        </Box>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#FFD700"
                fill="#FFD700"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );

  const renderExpenseDistribution = () => (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense Distribution
        </Typography>
        <Box height={300} display="flex" justifyContent="center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseDistribution}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {expenseDistribution.map((entry, index) => (
            <Box key={entry.name} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS[index],
                }}
              />
              <Typography variant="body2">
                {entry.name}: {entry.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );

  const renderRecentPayments = () => (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: '12px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={payment.avatar}>
                    {payment.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{payment.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  icon={
                    payment.type === 'Member' ? <Person /> :
                    payment.type === 'Vendor' ? <Store /> :
                    <FitnessCenter />
                  }
                  label={payment.type}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <StatusChip
                  label={payment.status}
                  status={payment.status}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton size="small">
                  <Receipt />
                </IconButton>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Financial Overview</Typography>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<Download />}
            variant="outlined"
            sx={{ borderColor: '#FFD700', color: '#FFD700' }}
          >
            Download Report
          </Button>
        </Box>
      </Box>

      {renderOverviewCards()}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {renderRevenueChart()}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderExpenseDistribution()}
        </Grid>
      </Grid>

      <Paper sx={{ mt: 4, borderRadius: '12px' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .Mui-selected': {
              color: '#FFD700 !important',
            },
          }}
        >
          <Tab label="All Transactions" />
          <Tab label="Member Payments" />
          <Tab label="Vendor Payments" />
          <Tab label="Staff Payments" />
        </Tabs>
      </Paper>

      {renderRecentPayments()}
    </Container>
  );
}
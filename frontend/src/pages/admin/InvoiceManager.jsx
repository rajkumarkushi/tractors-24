import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  Add,
  Download,
  FilterList,
  MoreVert,
  Receipt,
  LocalPrintshop,
  Share,
  Delete,
  AttachMoney,
  AccountBalanceWallet,
  Assignment,
  Warning,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
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
    status === 'pending' ? 'rgba(241, 196, 15, 0.2)' : 
    'rgba(231, 76, 60, 0.2)',
  color: 
    status === 'paid' ? '#2ecc71' : 
    status === 'pending' ? '#f1c40f' : 
    '#e74c3c',
}));

export default function InvoiceManager() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoiceStats, setInvoiceStats] = useState({});
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const fetchInvoiceData = async () => {
    try {
      setLoading(true);
      const [statsRes, invoicesRes, revenueRes] = await Promise.all([
        fetch('http://localhost:8081/api/auth/invoices/stats'),
        fetch('http://localhost:8081/api/auth/invoices/recent'),
        fetch('http://localhost:8081/api/auth/invoices/revenue'),
      ]);

      const [stats, invoices, revenue] = await Promise.all([
        statsRes.json(),
        invoicesRes.json(),
        revenueRes.json(),
      ]);

      setInvoiceStats(stats);
      setRecentInvoices(invoices);
      setMonthlyRevenue(revenue);
    } catch (err) {
      setError('Failed to fetch invoice data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event, invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const renderInvoiceOverview = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[
        {
          title: 'Total Invoices',
          value: invoiceStats.totalInvoices,
          subtext: `$${invoiceStats.totalAmount}`,
          icon: <Receipt />,
          color: '#FFD700',
        },
        {
          title: 'Paid Invoices',
          value: invoiceStats.paidInvoices,
          subtext: `$${invoiceStats.paidAmount}`,
          icon: <CheckCircle />,
          color: '#2ecc71',
        },
        {
          title: 'Pending Invoices',
          value: invoiceStats.pendingInvoices,
          subtext: 'Due this month',
          icon: <Schedule />,
          color: '#f1c40f',
        },
        {
          title: 'Overdue Invoices',
          value: invoiceStats.overdueInvoices,
          subtext: 'Action required',
          icon: <Warning />,
          color: '#e74c3c',
        },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.subtext}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Avatar>
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
              size="small"
            >
              Filter
            </Button>
            <Button
              startIcon={<Download />}
              size="small"
              sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
              variant="contained"
            >
              Export
            </Button>
          </Box>
        </Box>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey="amount"
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

  const renderInvoiceTable = () => (
    <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Recent Invoices</Typography>
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 250 }}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
            >
              New Invoice
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {invoice.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={invoice.client.avatar}>
                        {invoice.client.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2">
                          {invoice.client.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {invoice.client.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      ${invoice.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <StatusChip
                      label={invoice.status}
                      status={invoice.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, invoice)}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <LocalPrintshop sx={{ mr: 1 }} /> Print
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} /> Download PDF
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Paper>
  );

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Invoice Manager</Typography>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<Download />}
            variant="outlined"
            sx={{ borderColor: '#FFD700', color: '#FFD700' }}
          >
            Export All
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>

      {renderInvoiceOverview()}
      {renderRevenueChart()}

      <Paper sx={{ mb: 4, borderRadius: '12px' }}>
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
          <Tab label="All Invoices" />
          <Tab label="Paid" />
          <Tab label="Pending" />
          <Tab label="Overdue" />
        </Tabs>
      </Paper>

      {renderInvoiceTable()}
    </Container>
  );
}
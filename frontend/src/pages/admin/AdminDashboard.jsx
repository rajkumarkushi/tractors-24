// import {
//   DirectionsCar as CarIcon,
//   Message as InquiryIcon,
//   InsertChart as InsightsIcon,
//   Menu as MenuIcon,
//   Notifications as NotificationIcon,
//   AttachMoney as PaymentIcon,
//   Person as ProfileIcon,
//   Share as ReferralIcon,
//   Assignment as RtoIcon,
//   Search as SearchIcon,
//   People as StaffIcon,
//   Info as VehicleIcon,

// } from '@mui/icons-material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import {
//   AppBar,
//   Avatar,
//   Badge,
//   Box,
//   Container,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Popover,
//   Toolbar,
//   Typography,
//   useTheme
// } from '@mui/material';
// import React, { useState } from 'react';
// import RtoPage from '../RTO/RtoPage';
// import PartialProfile from '../user/PartialProfile'; // Import PartialProfile
// import StockDashboard from './StockDashboard';
// import CustomerInquiries from './CustomerInquiry'
// import VehicleInfo from './VehicleInfo';
// import Settings from '../Settings'
// import ReferralDashboard from '../Referral';
 

// const drawerWidth = 280;

// const DealerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('stock');
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false); // State for profile dialog
//   const theme = useTheme();

//   const menuItems = [
//     { id: 'stock', icon: <CarIcon />, label: 'Stock Tracking' },
//     // { id: 'profile', icon: <ProfileIcon />, label: 'Dealer Profile' },
//     { id: 'rto', icon: <RtoIcon />, label: 'RTO Management' },
//     { id: 'payment', icon: <PaymentIcon />, label: 'Payment & Profit' },
//     { id: 'vehicle', icon: <VehicleIcon />, label: 'Vehicle Information' },
//     { id: 'insights', icon: <InsightsIcon />, label: 'Dealer Insights' },
//     { id: 'notifications', icon: <NotificationIcon />, label: 'Notifications' },
//     { id: 'inquiries', icon: <InquiryIcon />, label: 'CustomerInquiries' },
//     { id: 'referral', icon: <ReferralIcon />, label: 'Referral System' },
//     { id: 'Settings', icon: <SettingsIcon />, label: 'Settings' }
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'stock':
//         return <StockDashboard />;
//       case 'rto':
//         return <RtoPage onRtoUpdate={() => console.log('RTO Updated')} />;
//       case 'vehicle':
//         return <VehicleInfo />;
//       case 'inquiries':
//         return <CustomerInquiries />;
//         case 'Settings':
//         return <Settings />;
//         case 'referral':
//           return <ReferralDashboard />;
//       default:
//         return (
//           <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
//             {menuItems.find(item => item.id === activeTab)?.label} - Coming Soon
//           </Paper>
//         );
//     }
//   };

//   const handleProfileDialogClose = () => {
//     setProfileDialogOpen(false);
//   };

//   const handleProfileClick = () => {
//     setProfileDialogOpen(true);
//   };

//   const ProfilePopup = ({ onClose }) => {
//     return (
//       <Popover
//         open={Boolean(profileDialogOpen)}
//         onClose={onClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         sx={{
//           position: 'absolute',
//           top: '56px',
//           right: '16px',
//           minWidth: '300px',
//         }}
//       >
//         <PartialProfile onClose={onClose} />
//       </Popover>
//     );
//   };

//   const drawer = (
//     <Box>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.primary.main }}>
//           Dealer Dashboard
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem
//             button
//             key={item.id}
//             selected={activeTab === item.id}
//             onClick={() => setActiveTab(item.id)}
//             sx={{
//               '&.Mui-selected': {
//                 backgroundColor: theme.palette.primary.light,
//                 '&:hover': {
//                   backgroundColor: theme.palette.primary.light,
//                 },
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: activeTab === item.id ? theme.palette.primary.main : 'inherit' }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText 
//               primary={item.label}
//               sx={{ color: activeTab === item.id ? theme.palette.primary.main : 'inherit' }}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           backgroundColor: 'white',
//           boxShadow: 1,
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={() => setMobileOpen(!mobileOpen)}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
          
//           <Box sx={{ flexGrow: 1 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 1, p: 1, maxWidth: 300 }}>
//               <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
//               <input
//                 placeholder="Search..."
//                 style={{
//                   border: 'none',
//                   backgroundColor: 'transparent',
//                   outline: 'none',
//                   width: '100%'
//                 }}
//               />
//             </Box>
//           </Box>

//           <IconButton>
//             <Badge badgeContent={4} color="primary">
//               <NotificationIcon />
//             </Badge>
//           </IconButton>
//           <IconButton color="inherit" onClick={handleProfileClick}>
//             <Avatar sx={{ ml: 2 }} />
//           </IconButton>
//           {profileDialogOpen && (
//             <ProfilePopup onClose={handleProfileDialogClose} />
//           )}
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: '#f5f5f5',
//           minHeight: '100vh'
//         }}
//       >
//         <Toolbar />
//         <Container maxWidth="xl">
//           {renderContent()}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default DealerDashboard;
import {
    DirectionsCar as CarIcon,
    Message as InquiryIcon,
    InsertChart as InsightsIcon,
    Menu as MenuIcon,
    Notifications as NotificationIcon,
    AttachMoney as PaymentIcon,
    Share as ReferralIcon,
    Assignment as RtoIcon,
    Search as SearchIcon,
    Info as VehicleIcon
} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Popover,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../utils/langaugeContext'; // Import useLanguage hook
import RtoPage from '../RTO/RtoPage';
import ReferralDashboard from '../Referral';
import Settings from '../Settings';
import CustomerInquiries from '../dealer/CustomerInquiry';
import StockDashboard from '../dealer/StockDashboard';
import VehicleInfo from '../dealer/VehicleInfo';
import PartialProfile from '../user/PartialProfile';
  
  const drawerWidth = 280;
  
  // Add translations to the language context
  const dashboardTranslations = {
    en: {
      adminDashboard: 'Admin Dashboard',
      stockTracking: 'Stock Tracking',
      rtoManagement: 'RTO Management',
      paymentProfit: 'Payment & Profit',
      vehicleInformation: 'Vehicle Information',
      dealerInsights: 'Dealer Insights',
      notifications: 'Notifications',
      customerInquiries: 'Customer Inquiries',
      referralSystem: 'Referral System',
      settings: 'Settings',
      search: 'Search...',
      comingSoon: 'Coming Soon'
    }
  };
  
  const DealerDashboard = () => {
    const [activeTab, setActiveTab] = useState('stock');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const theme = useTheme();
    const { language, translateText } = useLanguage();
    const [translations, setTranslations] = useState(dashboardTranslations.en);
  
    // Translate menu items when language changes
    useEffect(() => {
      const translateContent = async () => {
        if (language === 'English') {
          setTranslations(dashboardTranslations.en);
          return;
        }
  
        const translatedContent = {};
        for (const [key, value] of Object.entries(dashboardTranslations.en)) {
          translatedContent[key] = await translateText(value, language);
        }
        setTranslations(translatedContent);
      };
  
      translateContent();
    }, [language, translateText]);
  
    const menuItems = [
      { id: 'stock', icon: <CarIcon />, label: translations.stockTracking },
      { id: 'rto', icon: <RtoIcon />, label: translations.rtoManagement },
      { id: 'payment', icon: <PaymentIcon />, label: translations.paymentProfit },
      { id: 'vehicle', icon: <VehicleIcon />, label: translations.vehicleInformation },
      { id: 'insights', icon: <InsightsIcon />, label: translations.dealerInsights },
      { id: 'notifications', icon: <NotificationIcon />, label: translations.notifications },
      { id: 'inquiries', icon: <InquiryIcon />, label: translations.customerInquiries },
      { id: 'referral', icon: <ReferralIcon />, label: translations.referralSystem },
      { id: 'Settings', icon: <SettingsIcon />, label: translations.settings }
    ];
  
    const renderContent = () => {
      switch (activeTab) {
        case 'stock':
          return <StockDashboard />;
        case 'rto':
          return <RtoPage onRtoUpdate={() => console.log('RTO Updated')} />;
        case 'vehicle':
          return <VehicleInfo />;
        case 'inquiries':
          return <CustomerInquiries />;
        case 'Settings':
          return <Settings />;
        case 'referral':
          return <ReferralDashboard />;
        default:
          return (
            <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              {menuItems.find(item => item.id === activeTab)?.label} - {translations.comingSoon}
            </Paper>
          );
      }
    };
  
    const handleProfileDialogClose = () => {
      setProfileDialogOpen(false);
    };
  
    const handleProfileClick = () => {
      setProfileDialogOpen(true);
    };
  
    const ProfilePopup = ({ onClose }) => {
      return (
        <Popover
          open={Boolean(profileDialogOpen)}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            position: 'absolute',
            top: '56px',
            right: '16px',
            minWidth: '300px',
          }}
        >
          <PartialProfile onClose={onClose} />
        </Popover>
      );
    };
  
    const drawer = (
      <Box>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.primary.main }}>
            {translations.adminDashboard}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              selected={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: activeTab === item.id ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ color: activeTab === item.id ? theme.palette.primary.main : 'inherit' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: 'white',
            boxShadow: 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 1, p: 1, maxWidth: 300 }}>
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <input
                  placeholder={translations.search}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    outline: 'none',
                    width: '100%'
                  }}
                />
              </Box>
            </Box>
  
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <NotificationIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <Avatar sx={{ ml: 2 }} />
            </IconButton>
            {profileDialogOpen && (
              <ProfilePopup onClose={handleProfileDialogClose} />
            )}
          </Toolbar>
        </AppBar>
  
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
  
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
          }}
        >
          <Toolbar />
          <Container maxWidth="xl">
            {renderContent()}
          </Container>
        </Box>
      </Box>
    );
  };
  
  export default DealerDashboard;
import React from 'react';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { 
  DirectionsCar, 
  Search, 
  Payment, 
  ContactSupport 
} from '@mui/icons-material';

const QuickActions = () => {
  const actions = [
    { icon: <DirectionsCar />, text: 'Post Vehicle Ad', link: '/sell-vehicle' },
    { icon: <Search />, text: 'Search Vehicles', link: '/search' },
    { icon: <Payment />, text: 'Make Payment', link: '/payments' },
    { icon: <ContactSupport />, text: 'Get Support', link: '/support' },
  ];

  return (
    <Paper sx={{ mt: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Quick Actions
      </Typography>
      <List>
        {actions.map((action, index) => (
          <ListItem 
            button 
            key={index}
            sx={{
              '&:hover': {
                bgcolor: 'primary.light',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText primary={action.text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QuickActions;
import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, icon, link, count }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.light',
              borderRadius: '50%',
              p: 1,
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
          <IconButton onClick={() => navigate(link)}>
            <ArrowForward />
          </IconButton>
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {count !== undefined && (
          <Typography color="text.secondary">
            {count} {count === 1 ? 'item' : 'items'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
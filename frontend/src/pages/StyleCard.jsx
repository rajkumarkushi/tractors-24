import { Card, styled } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.05)',
    },
  },
  '& .MuiCardMedia-root': {
    transition: 'transform 0.3s ease',
  },
}));
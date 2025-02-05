import { styled } from '@mui/material/styles';
import { Box, Card, Button } from '@mui/material';

export const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  minHeight: '100vh',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '& .MuiCardMedia-root': {
    transition: 'transform 0.3s ease',
  },
  '&:hover .MuiCardMedia-root': {
    transform: 'scale(1.05)',
  },
}));

export const AnimatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: '-100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.5s ease',
  },
  '&:hover::after': {
    left: '100%',
  },
}));
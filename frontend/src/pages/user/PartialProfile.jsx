import {
    Box,
    Button,
    Divider,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/Authcontext';

const PartialProfile = ({ onClose }) => {
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Get user data from sessionStorage
        const storedUserData = {
            name: sessionStorage.getItem('userName'),
            email: sessionStorage.getItem('userEmail'),
            role: sessionStorage.getItem('userRole'),
            phone: sessionStorage.getItem('userPhone'),
        };

        // Only set userData if we have at least some data
        if (storedUserData.email || storedUserData.name) {
            setUserData(storedUserData);
        }
    }, []);

    const handleLogout = () => {
        authLogout();
        onClose && onClose();
        navigate('/login', { replace: true });
    };

    if (!userData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 2 }}>
                <Typography>Loading user data...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 3,
                width: 300,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 24,
                        mb: 1,
                    }}
                >
                    {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </Box>
                <Typography variant="h6">{userData.name || 'User'}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: {userData.email || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Role: {userData.role || 'N/A'}
                </Typography>
                {userData.phone && (
                    <Typography variant="body2" color="text.secondary">
                        Phone: {userData.phone}
                    </Typography>
                )}
            </Box>

            <Divider sx={{ width: '100%', mb: 2 }} />

            <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => console.log('Manage Profile Clicked')}
            >
                Manage Your Profile
            </Button>
            <Button
                variant="contained"
                fullWidth
                color="secondary"
                sx={{ mb: 2 }}
                onClick={() => console.log('Mail Setting Clicked')}
            >
                Mail Setting
            </Button>

            <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />

            <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleLogout}
            >
                Logout of My Account
            </Button>

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                System Support
            </Typography>
        </Box>
    );
};

export default PartialProfile;
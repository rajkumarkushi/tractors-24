const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth.middleware');
const mobileController = require('../controllers/mobile.controller');

// App Version Control
router.get('/version', mobileController.checkVersion);

// User Profile
router.get('/profile', authenticateUser, mobileController.getProfile);
router.put('/profile', authenticateUser, mobileController.updateProfile);

// Notifications
router.get('/notifications', authenticateUser, mobileController.getNotifications);
router.post('/notifications/token', authenticateUser, mobileController.updateFCMToken);

// Favorites
router.get('/favorites', authenticateUser, mobileController.getFavorites);
router.post('/favorites/:tractorId', authenticateUser, mobileController.addToFavorites);
router.delete('/favorites/:tractorId', authenticateUser, mobileController.removeFromFavorites);

// Search History
router.get('/search-history', authenticateUser, mobileController.getSearchHistory);
router.delete('/search-history', authenticateUser, mobileController.clearSearchHistory);

module.exports = router;
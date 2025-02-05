const express = require('express');
const router = express.Router();
const {register ,login} = require('../controllers/authControl');
const referralController = require('../controllers/referral.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

router.post('/signup', register);
router.post('/login', login);
// router.get('/profile', authenticateUser, authController.getProfile);
// router.put('/profile', authenticateUser, authController.updateProfile);

// referral routes
router.post('/generate-referral-code',  referralController.generateReferralCode);
router.post('/apply-referral-code', referralController.applyReferralCode);
router.get('/referral-stats',  referralController.getReferralStats);
router.post('/process-referral', referralController.processReferral);

module.exports = router;
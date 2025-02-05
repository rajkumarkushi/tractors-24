const express = require('express');
const router = express.Router();
const  { addInquiry, getInquiries, updateInquiryStatus } = require('../controllers/enquiry.controller');
// const { authenticateUser } = require('../middlewares/auth.middleware');
const calculateEMI = require('../controllers/EmiCalculator');

router.post('/add', addInquiry);
router.post('/update/:id', updateInquiryStatus);
router.get('/all', getInquiries);

router.post('/calculate-emi', calculateEMI);


module.exports = router;
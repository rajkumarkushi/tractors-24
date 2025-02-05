const express = require('express');
const router = express.Router();
// const tractorController = require('../controllers/tractorcontroller');
const { GetTractorDetails, ContactSeller } = require('../controllers/TractorDetail');
const {searchTractors} = require('../controllers/SearchController');

const { authenticateUser } = require('../middlewares/auth.middleware');

// Get tractor details
router.get('/tractors/:id', GetTractorDetails);
router.post('/search', searchTractors);

// Submit contact form
router.post('/tractors/:tractorId/contact', ContactSeller);
// router.post('/', authenticateUser, tractorController.createListing);
// router.get('/', tractorController.searchTractors);
// router.get('/:id', tractorController.getTractorById);
// router.put('/:id', authenticateUser, tractorController.updateListing);
// router.delete('/:id', authenticateUser, tractorController.deleteListing);

module.exports = router;
const express = require('express');
const router = express.Router();
const { 
  addTractor, 
  getTractors, 
  updateTractor, 
  deleteTractor, 
  getTractorsByBrand 
} = require('../controllers/StockController');
const { GetPopularTractors } = require('../controllers/Popular');

router.post('/add', addTractor);
router.get('/all', getTractors);
router.put('/update/:tractorId', updateTractor);
router.delete('/delete/:tractorId', deleteTractor);
router.get('/popular', GetPopularTractors);
router.get('/brand/:brandName', getTractorsByBrand); // New route

module.exports = router;

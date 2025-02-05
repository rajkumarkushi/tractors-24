// routes/rto.routes.js
const express = require('express');
const router = express.Router();
const rtoController = require('../controllers/rto.controller');

router.post('/vehicle-info', rtoController.getVehicleInfo);
router.post('/add-record', rtoController.addRtoRecord);

module.exports = router;
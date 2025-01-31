const express = require('express');
const { getFlightDetails } = require('../controllers/flightsController');
const router = express.Router();

// Route to fetch flight details
router.get('/details', getFlightDetails);

module.exports = router;
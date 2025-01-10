const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const authenticateToken = require('../middleware/authenticateToken')

router.get('/log',authenticateToken, flightController.log);
router.get('/logpdf', authenticateToken, flightController.logpdf)

module.exports = router;

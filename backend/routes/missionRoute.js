const express = require('express');
const router = express.Router();
const { createMission, getWaypoints, userMissions, updateMission, deleteMission } = require('../controllers/missionController');
const authenticateToken = require('../middleware/authenticateToken');  // Import the middleware

// Routes for missions
router.post('/create', authenticateToken, createMission);  // Create mission
router.get('/waypoints/:missionId', getWaypoints);         // Get waypoints
router.get('/userMissions', authenticateToken, userMissions);  // Get all missions for user
router.delete('/delete/:missionId', authenticateToken, deleteMission); // Delete mission

module.exports = router;

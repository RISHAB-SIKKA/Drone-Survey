const { v4: uuidv4 } = require('uuid');
const missionModel = require('../models/missionModel');
const droneModel = require('../models/droneModel');
const algorithm = require('../utils/algorthm');

// Create mission
exports.createMission = async (req, res) => {
    const { name, lat, long, altitude, radius, speed } = req.body;
  
    try {
      const userId = req.userId; 
      if (!userId) {
        return res.status(400).json({ msg: 'User ID not found. Make sure you are logged in.' });
      }
  
      // Find the first drone associated with the user
      const userDrone = await droneModel.findOne({ userId }).sort({ createdAt: 1 });
      if (!userDrone) {
        return res.status(404).json({ msg: 'No drone found for this user.' });
      }
  
      // Generate random waypoints
      const waypoints = algorithm.generateRandomPoints(lat, long, radius, 10);
  
      // Create a new mission
      const newMission = new missionModel({
        userId,
        droneId: userDrone._id,
        missionId: uuidv4(),
        flightId: uuidv4(),
        altitude,
        speed,
        name,
        lat,
        long,
        radius,
        waypoints,
      });
  
      await newMission.save();
      res.status(201).json(newMission);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error', error: err.message });
    }
  };

// Get all missions for a user
exports.userMissions = async (req, res) => {
    const userId = req.userId;
    console.log(userId);

    try {
        const missions = await missionModel.find({ userId });

        if (missions.length === 0) {
            return res.status(404).json({ msg: 'No missions found for the specified user' });
        }

        res.status(200).json(missions);
    } catch (err) {
        console.error('Error fetching missions:', err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get waypoints for a mission
exports.getWaypoints = async (req, res) => {
    const { missionId } = req.params;

    try {
        // Find the mission by its missionId
        const mission = await missionModel.findOne({ missionId });

        // Ensure the mission exists
        if (!mission) {
            return res.status(404).json({ msg: 'Mission not found' });
        }

        // Destructure mission fields including userId
        const { userId, alt, speed, name, lat, long, radius, createdAt, updatedAt } = mission;

        // Generate random waypoints using the algorithm
        const randomPoints = algorithm.generateRandomPoints(lat, long, radius, 10);

        res.status(200).json(
            { 
                missionId,
                userId,   
                alt,
                speed,
                name,
                randomPoints,
                createdAt, 
                updatedAt
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Delete mission
exports.deleteMission = async (req, res) => {
    const { missionId } = req.params;

    try {
        const deletedMission = await missionModel.findOneAndDelete({ missionId });

        if (!deletedMission) {
            return res.status(404).json({ msg: 'Mission not found' });
        }

        res.status(200).json({ msg: 'Mission deleted successfully' });
    } catch (err) {
        console.error('Error deleting mission:', err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const { v4: uuidv4 } = require("uuid");
const droneModel = require("../models/droneModel");

// Create a Drone
module.exports.create = async (req, res) => {
  const { name, type } = req.body;

  try {
    // const userId = req.userId; // Extract userId from middleware

    const newDrone = new droneModel({
      userId: req.userId,
      droneId: uuidv4(), // Generate a unique ID for the drone
      name: name,
      type: type,
      email: "NULL",
    });

    await newDrone.save();
    res.status(201).json(newDrone);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Get All Drones
module.exports.getAllDrones = async (req, res) => {
  try {
    const drones = await droneModel.find();
    res.status(200).json(drones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Get Drones by User ID
module.exports.getDronesByUser = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from middleware

    const drones = await droneModel.find({ userId });
    res.status(200).json(drones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// Delete a Drone
module.exports.deleteDrone = async (req, res) => {
  const { droneId } = req.params;

  try {
    const drone = await droneModel.findOneAndDelete({ droneId });

    if (!drone) {
      return res.status(404).json({ msg: "Drone not found" });
    }

    res.status(200).json({ msg: "Drone deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

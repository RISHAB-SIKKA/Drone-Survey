const express = require("express");
const router = express.Router();
const droneController = require("../controllers/droneController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/create", authenticateToken, droneController.create);
router.get("/all", authenticateToken, droneController.getAllDrones);
router.get("/drones/user", authenticateToken, droneController.getDronesByUser);
router.delete("/drones/:droneId", authenticateToken, droneController.deleteDrone);

module.exports = router;

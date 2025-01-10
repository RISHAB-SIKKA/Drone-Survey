const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", authController.register); // Register a user
router.post("/login", authController.login); // Login a user
router.post("/logout", authenticateToken, authController.logout); // Logout a user
router.get("/me", authenticateToken, authController.getUser); // Get current user details

module.exports = router;

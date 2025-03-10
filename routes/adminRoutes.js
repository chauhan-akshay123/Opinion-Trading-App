const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
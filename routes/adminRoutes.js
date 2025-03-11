const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { adminMiddleware } = require("../middleware/roleMiddleware");
const { getAllEvents, getEventById ,createEvent, deleteEvent, getAllTrades, settleTrade } = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

// Events Management
router.get("/events", authMiddleware, adminMiddleware, getAllEvents);
router.get("/events/:id", authMiddleware, adminMiddleware, getEventById);
router.post("/events", authMiddleware, adminMiddleware, createEvent);
router.delete("/events/:id", authMiddleware, adminMiddleware, deleteEvent);

// Trade Management
router.get("/trades", authMiddleware, adminMiddleware, getAllTrades);
router.patch("/trades/:id", authMiddleware, adminMiddleware, settleTrade);

module.exports = router;
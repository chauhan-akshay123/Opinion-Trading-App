const express = require("express");
const { placeBet, getUserTrades, cancelTrade,  getActiveEvents,
    getUserActiveBets } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/trade", authMiddleware, placeBet);
router.get("/trades", authMiddleware, getUserTrades);
router.delete("/trade/:id", authMiddleware, cancelTrade);

// User dashboard APIs
router.get("/dashboard/events", authMiddleware, getActiveEvents);
router.get("dashboard/bets", authMiddleware, getActiveEvents);

module.exports = router;
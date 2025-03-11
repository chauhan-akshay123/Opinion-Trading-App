const express = require("express");
const { placeBet, getUserTrades, cancelTrade } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/trade", authMiddleware, placeBet);
router.get("/trades", authMiddleware, getUserTrades);
router.delete("/trade/:id", authMiddleware, cancelTrade);

module.exports = router;
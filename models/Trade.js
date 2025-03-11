const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        selectedTeam: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true,
            min: 1
        },
        status: {
            type: String,
            enum: ["pending", "won", "lost"],
            default: "pending"
        },
        payout: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Trade", TradeSchema);
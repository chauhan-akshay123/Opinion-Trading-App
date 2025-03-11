const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        teamSelected: {
            type: String,
            required: true
        },
        stake: {
            type: Number, 
            required: true,
            min: 1
        },
        odds: {
            type: Number,
            required: true
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
);

module.exports = mongoose.model("Trade", TradeSchema);

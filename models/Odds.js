const mongoose = require("mongoose");

const OddSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        teamA_odds: {
            type: Number,
            required: true
        },
        teamB_odds: {
            type: Number,
            required: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
    },
    {
     timestamps: true   
    }
);

module.exports = mongoose.model("Odds", OddSchema);
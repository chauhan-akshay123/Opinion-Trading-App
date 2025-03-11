const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        eventId: { 
            type: String,
            required: true,
            unique: true
         },
        sport: {
            type: String,
            required: true
        },
        teamA: {
            type: String,
            required: true
        },
        teamB: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["upcoming", "live", "completed"],
            default: "upcoming"
        },
        winner: {
            type: String,
            default: null
        },
        odds: {  
            type: Map,
            of: Number, // Odds are stored as { "Team A": 1.5, "Team B": 2.2 }
            required: true
        } 
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", EventSchema);
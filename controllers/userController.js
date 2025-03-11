const Trade = require("../models/Trade");
const Event = require("../models/Event");
const User = require("../models/User");

// Place a bet
exports.placeBet = async (req, res) => {
    try{
      const { eventId, teamSelected, stake } = req.body;
      const userId = req.user.id; 

      // Validate inputs
      if (!eventId || !teamSelected || !stake) {
        return res.status(400).json({ message: "All fields (eventId, teamSelected, stake) are required" });
    }

      // Find the event
      const event = await Event.findOne({ eventId });
      if(!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // validate team selection
      if(![event.teamA, event.teamB].includes(teamSelected)){
          return res.status(400).json({ message: "Invalid team selected" });
      }

      // Fetch user details 
      const user = await User.findOne(userId);
      if(!user) {
         return res.status(404).json({ message: "User not found" });
      }
       
      // Get odds based on the selected team
      const odds = event.odds[teamSelected]

      // create trade
      const trade = new Trade({
        user: userId,
        event: event._id,
        teamSelected,
        stake,
        odds,
        status: "pending",
      });

      await trade.save();
      res.status(201).json({ message: "Bet placed successfully", trade });
    } catch(error){
       res.status(500).json({ message: "Server error", error });
    }
};

// Get user's trades
exports.getUserTrades = async (req, res) => {
    try{
      const userId = req.user.id;

      const trades = await Trade.find({ user: userId }).populate("event");
      res.json(trades);
    } catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};

// Cancel a pending trade
exports.cancelTrade = async (req, res) => {
    try{
      const { id } = req.params;
      const userId = req.user.id;
      
      const trade = await Trade.findOne({ _id: id, user: userId });

      if(!trade){
        return res.status(404).json({ message: "Trade not found" });
      }

      if(trade.status !== "pending"){
         return res.status(400).json({ message: "Only pending trades can be cancelled" });
      }

      await trade.deleteOne();
      res.json({ message: "Trade Cancelled successfully" });
    } catch(error){
       res.status(500).json({ message: "Server error", error }); 
    }
};
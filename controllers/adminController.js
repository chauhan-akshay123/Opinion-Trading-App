const Event = require("../models/Event");
const Trade = require("../models/Trade");

// Get all events
exports.getAllEvents = async (req, res) => {
    try{
      const events = await Event.find();  
      res.json(events);
    } catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};

// create a new event
exports.createEvent = async (req, res) => {
    try{
        const { eventId, sport, teamA, teamB, startTime, status, winner } = req.body;
        
        const existingEvent = await Event.findOne({ eventId });
        if(existingEvent) {
           return res.status(400).json({ message: "Event ID must be unique." }); 
        }

        const event = new Event({
            eventId,
            sport,
            teamA,
            teamB,
            startTime,
            status: status || "upcoming", // default is upcoming
            winner: winner || null
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getEventById = async (req, res) => {
    try{
      const event = await Event.findOne({ eventId: req.params.id });
      if(!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(event); 
    } catch(error){
        res.status(500).json({ message: "Server error", error });
    }
}

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ eventId: req.params.id });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all trades
exports.getAllTrades = async (req, res) => {
    try{
      const trades = await Trade.find().populate("user event");   
      res.json(trades);
    } catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};

// Settle a trade (mark as won/lost)
exports.settleTrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["won", "lost"].includes(status)) {
            return res.status(400).json({ message: `Invalid status. Use 'won' or 'lost'` });
        }

        const trade = await Trade.findByIdAndUpdate(id, { status }, { new: true });

        if (!trade) {
            return res.status(404).json({ message: "Trade not found" });
        }

        res.status(200).json({ message: "Trade status updated", trade });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

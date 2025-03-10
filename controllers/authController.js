const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
  try{
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch(error){
    res.status(500).json({ message: "Server error", error }); 
  }
};

exports.login = async (req, res) => {
    try{
     const { email, password } = req.body;

     const user = await User.findOne({ email });
     if(!user) return res.status(404).json({ message: "Invalid credentials" });

     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "2d",
     });
     
     res.json({ message: "Login successful", token });
    } catch(error){
       res.status(500).json({ message: "Server error", error }); 
    }
};
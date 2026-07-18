// src/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Registration Endpoint: POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone,password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Create and save the new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful! You can now log in." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Append this to src/routes/auth.js
const jwt = require("jsonwebtoken");

// Login Endpoint: POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Validate password using the helper method we just added
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate a JSON Web Token (JWT)
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "fallback_secret_key", // Add JWT_SECRET to your .env file later!
      { expiresIn: "1d" }
    );

    // 4. Return success and send token back
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});
module.exports = router;
// src/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header (Format: Bearer <token>)
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No authorization token found." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key");
    req.user = decoded; // Attach decoded user context (e.g., userId) to request object
    next(); // Pass control to the controller method
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
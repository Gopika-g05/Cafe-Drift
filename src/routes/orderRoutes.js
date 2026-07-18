// src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/orders/place
router.post("/place", async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        // In a real application, you'd extract the userId from a session or JWT token.
        // For testing purposes right now, we can use a placeholder ID or read it if passed.
        const userId = req.body.userId || "65afcc732f91a24d52b9a7c3"; // Fallback test ID

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty. Cannot place order." });
        }

        const newOrder = new Order({
            userId,
            items,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ message: "Internal server error while placing order." });
    }
});

module.exports = router;
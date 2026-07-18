// src/models/MenuItem.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required (e.g., Drinks, Bakery, Desserts)"],
    enum: ["Drinks", "Bakery", "Desserts", "Main Course"], // You can add your own categories here
  },
  image: {
    type: String, // Stores the image filename or URL (e.g., "latte.jpg")
    default: "default-food.jpg",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
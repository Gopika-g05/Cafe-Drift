// src/controllers/menuController.js
const MenuItem = require("../models/MenuItem");

// 1. Public: List all available items
exports.list = async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error listing menu items:", error);
    res.status(500).json({ message: "Server error while fetching menu" });
  }
};

// 2. Public: Get a single item by ID
exports.get = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    console.error("Error getting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Protected: Create an item
exports.create = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Menu item created!", item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(400).json({ message: error.message || "Failed to create item" });
  }
};

// 4. Protected: Update an item
exports.update = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 5. Protected: Delete an item
exports.remove = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item removed from menu" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error" });
  }
};
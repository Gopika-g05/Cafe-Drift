// src/controllers/menuController.js
const MenuItem = require("../models/MenuItem");

// 1. Public: List all available items
exports.list = async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error listing menu items:", error);

    const fallbackItems = [
      { name: 'Espresso', category: 'Coffee', price: 120, image: 'espresso.jpg', description: 'Strong espresso shot to kickstart your day.', isAvailable: true },
      { name: 'Cappuccino', category: 'Coffee', price: 180, image: 'cappuccino.jpg', description: 'Creamy steamed milk coffee with cocoa powder.', isAvailable: true },
      { name: 'Latte', category: 'Coffee', price: 190, image: 'latte.jpg', description: 'Smooth milk coffee with silky foam.', isAvailable: true },
      { name: 'Sandwich', category: 'Snacks', price: 140, image: 'sandwich.jpg', description: 'Freshly made sandwich with vegetables and cheese.', isAvailable: true },
      { name: 'Burger', category: 'Snacks', price: 220, image: 'burger.jpg', description: 'Juicy burger with fresh greens and sauce.', isAvailable: true },
      { name: 'Fries', category: 'Snacks', price: 110, image: 'fries.jpg', description: 'Crispy golden french fries.', isAvailable: true },
      { name: 'Brownie', category: 'Desserts', price: 130, image: 'brownie.jpg', description: 'Chocolate brownie with a gooey center.', isAvailable: true },
      { name: 'Cake', category: 'Desserts', price: 160, image: 'cake.jpg', description: 'Delightful slice of cake with cream.', isAvailable: true },
      { name: 'Donut', category: 'Desserts', price: 100, image: 'donut.jpg', description: 'Sweet donut glazed to perfection.', isAvailable: true },
      { name: 'Chai', category: 'Tea', price: 90, image: 'chai.jpg', description: 'Traditional spiced tea for a warm break.', isAvailable: true },
      { name: 'Matcha', category: 'Tea', price: 150, image: 'matcha.jpg', description: 'Green tea latte with a refreshing flavor.', isAvailable: true },
      { name: 'Hot Chocolate', category: 'Chocolate', price: 170, image: 'hot-chocolate.jpg', description: 'Rich chocolate drink topped with foam.', isAvailable: true },
      { name: 'Steamer', category: 'Chocolate', price: 160, image: 'steamer.jpg', description: 'Warm milk drink with vanilla notes.', isAvailable: true },
      { name: 'Smoothie', category: 'Blended', price: 200, image: 'smoothie.jpg', description: 'Fruity blended smoothie full of energy.', isAvailable: true },
      { name: 'Frappe', category: 'Blended', price: 210, image: 'frappe.jpg', description: 'Iced coffee frappe with whipped cream.', isAvailable: true },
      { name: 'Milkshake', category: 'Blended', price: 180, image: 'milkshake.jpg', description: 'Classic milkshake with a rich texture.', isAvailable: true },
      { name: 'Fresh Juice', category: 'Juice', price: 140, image: 'fresh-juice.jpg', description: 'Freshly squeezed fruit juice.', isAvailable: true },
      { name: 'Lemonade', category: 'Juice', price: 110, image: 'lemonade.jpg', description: 'Cool lemonade with a citrus twist.', isAvailable: true },
      { name: 'Fruit Soda', category: 'Juice', price: 120, image: 'fruit-soda.jpg', description: 'Sparkling fruit soda with berry notes.', isAvailable: true }
    ];

    return res.status(200).json(fallbackItems);
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
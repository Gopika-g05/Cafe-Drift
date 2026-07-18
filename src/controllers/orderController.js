const Joi = require('joi');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const orderSchema = Joi.object({ items: Joi.array().items(Joi.object({ menuItem: Joi.string().required(), quantity: Joi.number().min(1).default(1) })).min(1).required() });

exports.create = async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const itemsReq = req.body.items;
    // Build items with price snapshot
    const items = [];
    let total = 0;
    for (const it of itemsReq) {
      const menuItem = await MenuItem.findById(it.menuItem);
      if (!menuItem) return res.status(400).json({ message: `Menu item not found: ${it.menuItem}` });
      const price = menuItem.price;
      const qty = it.quantity || 1;
      items.push({ menuItem: menuItem._id, quantity: qty, price });
      total += price * qty;
    }

    const order = new Order({ user: req.user._id, items, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) { next(err); }
};

exports.listUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.listAll = async (req, res, next) => {
  try {
    // Only admin route should call this; route-level check recommended
    const orders = await Order.find().populate('items.menuItem').populate('user', 'name email');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem');
    if (!order) return res.status(404).json({ message: 'Not found' });
    // Ensure user owns order or is admin
    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) { next(err); }
};

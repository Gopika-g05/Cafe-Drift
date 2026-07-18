const Joi = require('joi');
const Order = require('../models/Order');

const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().min(1).default(1)
    })
  ).min(1).required()
});

exports.create = async (req, res, next) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const itemsReq = req.body.items;
    const items = itemsReq.map(it => ({
      id: it.id,
      name: it.name,
      price: it.price,
      quantity: it.quantity || 1
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({ userId: req.user.userId || req.user._id, items, totalPrice: total });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    next(err);
  }
};

exports.listUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.listAll = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    if (order.userId.toString() !== req.user.userId.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

// Added phone validation to the registration schema just in case
const registerSchema = Joi.object({ 
  name: Joi.string().required(), 
  email: Joi.string().email().required(), 
  password: Joi.string().min(6).required(),
  phone: Joi.string().optional() 
});
const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

const signToken = (user) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ name, email, password, phone });
    await user.save();
    const token = signToken(user);
    
    // Explicitly included user.phone in the JSON response
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    
    // Explicitly included user.phone in the JSON response
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    next(err);
  }
};
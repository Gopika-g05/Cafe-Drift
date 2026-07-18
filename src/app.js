const express = require('express');
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();
const frontendDir = path.join(__dirname, '../frontend');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// 1. Serve static files from your frontend directory first
app.use(express.static(frontendDir));

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// 3. Serve the frontend pages for public routes
const frontendPages = {
  '/': 'index.html',
  '/menu': 'menu.html',
  '/menu.html': 'menu.html',
  '/contact': 'contact.html',
  '/contact.html': 'contact.html',
  '/login': 'login.html',
  '/login.html': 'login.html',
  '/signup': 'signup.html',
  '/signup.html': 'signup.html',
  '/cart': 'cart.html',
  '/cart.html': 'cart.html',
  '/profile': 'profile.html',
  '/profile.html': 'profile.html',
  '/user-menu': 'user-menu.html',
  '/user-menu.html': 'user-menu.html',
  '/order-success': 'order-success.html',
  '/order-success.html': 'order-success.html'
};

Object.entries(frontendPages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(frontendDir, file));
  });
});

// 4. Fallback for any other non-API route
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
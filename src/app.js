const express = require('express');
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// 1. Serve static files from your frontend directory first
app.use(express.static(path.join(__dirname, "../frontend")));

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// 3. Serve the index.html for the root domain or fallback navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
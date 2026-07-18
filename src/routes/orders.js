const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/orderController');

// Create order (authenticated)
router.post('/', auth, controller.create);
// Get user's orders
router.get('/', auth, controller.listUser);
// Admin: list all orders (requires admin user)
router.get('/all', auth, controller.listAll);
// Get specific order
router.get('/:id', auth, controller.get);

module.exports = router;

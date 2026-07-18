const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/menuController');

// Public list and get
router.get('/', controller.list);
router.get('/:id', controller.get);

// Protected create/update/delete (requires auth)
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);

module.exports = router;

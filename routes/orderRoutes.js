const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// POST /api/orders - anyone can place an order
router.post('/', placeOrder);

// GET /api/orders - Admin and Dispatcher only
router.get('/', protect, authorizeRoles('Admin', 'Dispatcher'), getOrders);

// GET /api/orders/:id - Admin and Dispatcher only
router.get('/:id', protect, authorizeRoles('Admin', 'Dispatcher'), getOrderById);

// PATCH /api/orders/:id/status - Admin, Dispatcher, Kitchen
router.patch('/:id/status', protect, authorizeRoles('Admin', 'Dispatcher', 'Kitchen'), updateOrderStatus);

module.exports = router;
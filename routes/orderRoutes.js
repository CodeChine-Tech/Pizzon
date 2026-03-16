const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  pickupOrder,
  downloadInvoice
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

// POST /api/orders/:id/pickup - Rider picks up order (send customer email)
router.post('/:id/pickup', protect, authorizeRoles('Rider', 'Admin', 'Dispatcher'), pickupOrder);

// GET /api/orders/:id/invoice - Download PDF Invoice
router.get('/:id/invoice', protect, authorizeRoles('Admin', 'Dispatcher'), downloadInvoice);

module.exports = router;
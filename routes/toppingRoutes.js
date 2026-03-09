const express = require('express');
const router = express.Router();

const {
  getToppings,
  createTopping,
  updateTopping,
  deleteTopping,
  toggleToppingAvailability
} = require('../controllers/toppingController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// GET /api/toppings - everyone can view
router.get('/', getToppings);

// POST /api/toppings - Admin only
router.post('/', protect, authorizeRoles('Admin'), createTopping);

// PUT /api/toppings/:id - Admin only
router.put('/:id', protect, authorizeRoles('Admin'), updateTopping);

// DELETE /api/toppings/:id - Admin only
router.delete('/:id', protect, authorizeRoles('Admin'), deleteTopping);

// PATCH /api/toppings/:id/availability - Admin only
router.patch('/:id/availability', protect, authorizeRoles('Admin'), toggleToppingAvailability);

module.exports = router;
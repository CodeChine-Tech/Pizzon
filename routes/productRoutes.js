// 1. Import express
const express = require('express');
const router = express.Router();

// 2. Import controller functions
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleAvailability
} = require('../controllers/productController');

// 3. Import middleware
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// 4. Define routes

// GET /api/products - no protection, everyone can view
router.get('/', getProducts);

// POST /api/products - Admin only
router.post('/', protect, authorizeRoles('Admin'), createProduct);

// PUT /api/products/:id - Admin only
router.put('/:id', protect, authorizeRoles('Admin'), updateProduct);

// DELETE /api/products/:id - Admin only
router.delete('/:id', protect, authorizeRoles('Admin'), deleteProduct);

// PATCH /api/products/:id/availability - Admin only
router.patch('/:id/availability', protect, authorizeRoles('Admin'), toggleAvailability);

// 5. Export
module.exports = router;
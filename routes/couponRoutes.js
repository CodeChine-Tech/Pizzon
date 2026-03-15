const express = require('express');
const router = express.Router();
const {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  validateCoupon
} = require('../controllers/couponController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Admin routes
router.post('/', protect, authorizeRoles('Admin'), createCoupon);
router.get('/', protect, authorizeRoles('Admin'), getCoupons);
router.put('/:id', protect, authorizeRoles('Admin'), updateCoupon);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteCoupon);

// Customer validates coupon
router.post('/validate', validateCoupon);

module.exports = router;
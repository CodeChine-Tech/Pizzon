const express = require('express');
const router = express.Router();

const {
  updateLocation,
  getRiderLocation,
  deactivateLocation
} = require('../controllers/riderController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// POST /api/rider/location - Rider updates his location
router.post(
  '/location',
  protect,
  authorizeRoles('Rider'),
  updateLocation
);

// GET /api/rider/location/:orderId - Admin/Dispatcher sees rider location
router.get(
  '/location/:orderId',
  protect,
  authorizeRoles('Admin', 'Dispatcher'),
  getRiderLocation
);

// POST /api/rider/deactivate - Rider marks himself offline
router.post(
  '/deactivate',
  protect,
  authorizeRoles('Rider'),
  deactivateLocation
);

module.exports = router;
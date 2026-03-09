const express = require('express');
const router = express.Router();

const {
  getSettings,
  updateSettings
} = require('../controllers/settingsController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// GET /api/settings - Admin only
router.get('/', protect, authorizeRoles('Admin'), getSettings);

// PUT /api/settings - Admin only
router.put('/', protect, authorizeRoles('Admin'), updateSettings);

module.exports = router;
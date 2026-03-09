// 1. Import express
const express = require('express');

// 2. Create a router
const router = express.Router();

// 3. Import controller functions
const { register, login } = require('../controllers/authController');

// 4. Define routes
// POST /api/auth/register → goes to register function
router.post('/register', register);

// POST /api/auth/login → goes to login function
router.post('/login', login);

// 5. Export the router
module.exports = router;
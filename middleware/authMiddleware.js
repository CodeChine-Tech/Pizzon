// 1. Import tools
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 2. PROTECT middleware - checks if token is valid
const protect = async (req, res, next) => {
  try {
    // Check if token exists in request headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    // Extract token from "Bearer eyJ..."
    const token = authHeader.split(' ')[1];

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user from database using ID inside token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request so next middleware/controller can use it
    req.user = user;

    // Move on to next middleware or controller
    next();

  } catch (error) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// 3. AUTHORIZE ROLES middleware - checks if user has right role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    // Check if user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    // Role is allowed, move on
    next();
  };
};

// 4. Export both
module.exports = { protect, authorizeRoles };
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    // Coupon code — e.g. "PIZZA20"
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    // Discount type
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },

    // Discount value
    // percentage = 20 means 20% off
    // fixed = 5 means $5 off
    discountValue: {
      type: Number,
      required: true
    },

    // Minimum order amount to use coupon
    minOrderAmount: {
      type: Number,
      default: 0
    },

    // Maximum discount amount (for percentage coupons)
    maxDiscountAmount: {
      type: Number,
      default: null
    },

    // How many times this coupon can be used
    usageLimit: {
      type: Number,
      default: null  // null = unlimited
    },

    // How many times it has been used so far
    usedCount: {
      type: Number,
      default: 0
    },

    // Expiry date
    expiryDate: {
      type: Date,
      default: null  // null = never expires
    },

    // Is coupon active?
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
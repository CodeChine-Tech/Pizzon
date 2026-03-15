const Coupon = require('../models/Coupon');

// 1. CREATE COUPON (Admin only)
const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({
      message: 'Coupon created successfully! 🎟️',
      coupon
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. GET ALL COUPONS (Admin only)
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Coupons fetched successfully',
      count: coupons.length,
      coupons
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. UPDATE COUPON (Admin only)
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    res.status(200).json({ message: 'Coupon updated', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. DELETE COUPON (Admin only)
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. VALIDATE COUPON (Customer uses this)
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    // Find coupon
    const coupon = await Coupon.findOne({
      code: code.toUpperCase()
    });

    // Coupon exist karta hai?
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code! ❌' });
    }

    // Active hai?
    if (!coupon.isActive) {
      return res.status(400).json({ message: 'This coupon is no longer active! ❌' });
    }

    // Expiry check
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: 'This coupon has expired! ⏰' });
    }

    // Usage limit check
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit reached! ❌' });
    }

    // Minimum order check
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount is $${coupon.minOrderAmount} for this coupon! 🛒`
      });
    }

    // Calculate discount
    let discountAmount = 0;

    if (coupon.discountType === 'percentage') {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      // Apply max discount cap if set
      if (coupon.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
      }
    } else {
      // Fixed discount
      discountAmount = coupon.discountValue;
    }

    // Final price after discount
    const finalAmount = Math.max(0, orderAmount - discountAmount);

    res.status(200).json({
      message: 'Coupon applied successfully! 🎉',
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      originalAmount: orderAmount,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      finalAmount: parseFloat(finalAmount.toFixed(2))
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  validateCoupon
};
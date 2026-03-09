// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Create the schema
const globalSettingsSchema = new mongoose.Schema(
  {
    // Tax percentage - 0.10 means 10%
    taxRate: {
      type: Number,
      required: true,
      default: 0.10   // default 10% tax
    },

    // Flat delivery charge for every order
    deliveryFee: {
      type: Number,
      required: true,
      default: 2.99   // default $2.99 delivery fee
    },

    // Multiply all prices by this number
    // 1.0 means no change
    // 1.2 means add 20% to all prices
    priceMultiplier: {
      type: Number,
      required: true,
      default: 1.0    // default no change
    }
  },

  // Auto adds createdAt and updatedAt
  { timestamps: true }
);

// 3. Create the model
const GlobalSettings = mongoose.model('GlobalSettings', globalSettingsSchema);

// 4. Export it
module.exports = GlobalSettings;
// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Create the schema
const toppingSchema = new mongoose.Schema(
  {
    // Topping name - example: "Extra Cheese", "Olives", "Mushrooms"
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true  // no duplicate toppings allowed
    },

    // Extra price for this topping
    price: {
      type: Number,
      required: true,
      default: 0    // some toppings might be free
    },

    // Is this topping available right now?
    available: {
      type: Boolean,
      default: true
    }
  },

  // Auto adds createdAt and updatedAt
  { timestamps: true }
);

// 3. Create the model
const Topping = mongoose.model('Topping', toppingSchema);

// 4. Export it
module.exports = Topping;
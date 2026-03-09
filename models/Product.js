// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Schema for each size and its price
const sizeSchema = new mongoose.Schema({

  // Size name - only these 3 values allowed
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true
  },

  // Price for this size
  price: {
    type: Number,
    required: true
  }

});

// 3. Main Product schema
const productSchema = new mongoose.Schema(
  {
    // Pizza name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Pizza description
    description: {
      type: String,
      trim: true
    },

    // List of sizes with prices
    // Each size follows the sizeSchema above
    sizes: [sizeSchema],

    // Is this pizza available to order right now?
    available: {
      type: Boolean,
      default: true   // by default every new pizza is available
    }
  },

  // Auto adds createdAt and updatedAt
  { timestamps: true }
);

// 4. Create the model
const Product = mongoose.model('Product', productSchema);

// 5. Export it
module.exports = Product;
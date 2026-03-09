// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Schema for each item in the order
const orderItemSchema = new mongoose.Schema({

  // Which pizza was ordered
  // 'ref: Product' links this to our Product model
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  // Which size was selected
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true
  },

  // How many of this pizza
  quantity: {
    type: Number,
    required: true,
    default: 1
  },

  // Price of this item at time of order
  price: {
    type: Number,
    required: true
  }

});

// 3. Schema for customer info
const customerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  }

});

// 4. Main Order schema
const orderSchema = new mongoose.Schema(
  {
    // List of pizzas in this order
    items: [orderItemSchema],

    // List of toppings added
    // Links to our Topping model
    toppings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
      }
    ],

    // Final total price - calculated by backend
    totalPrice: {
      type: Number,
      required: true
    },

    // Where is this order right now?
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },

    // Customer who placed the order
    customer: customerSchema

  },

  // Auto adds createdAt and updatedAt
  { timestamps: true }
);

// 5. Create the model
const Order = mongoose.model('Order', orderSchema);

// 6. Export it
module.exports = Order;

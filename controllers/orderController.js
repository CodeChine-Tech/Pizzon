const Order = require('../models/Order');
const Product = require('../models/Product');
const Topping = require('../models/Topping');
const GlobalSettings = require('../models/GlobalSettings');

// 1. PLACE NEW ORDER
const placeOrder = async (req, res) => {
  try {
    const { items, toppingIds, customer } = req.body;

    // Fetch global settings for price calculation
    let settings = await GlobalSettings.findOne();

    // If no settings exist yet, use defaults
    if (!settings) {
      settings = { taxRate: 0.10, deliveryFee: 2.99, priceMultiplier: 1.0 };
    }

    // Calculate total price server-side
    let subtotal = 0;

    // Calculate price for each item
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

      // Find the selected size and its price
      const sizeData = product.sizes.find(s => s.size === item.size);
      if (!sizeData) {
        return res.status(400).json({ message: `Size not found` });
      }

      const itemTotal = sizeData.price * item.quantity * settings.priceMultiplier;
      subtotal += itemTotal;

      orderItems.push({
        product: item.productId,
        size: item.size,
        quantity: item.quantity,
        price: sizeData.price
      });
    }

    // Add topping prices
    if (toppingIds && toppingIds.length > 0) {
      for (const toppingId of toppingIds) {
        const topping = await Topping.findById(toppingId);
        if (topping) subtotal += topping.price;
      }
    }

    // Apply tax and delivery fee
    const totalPrice = (subtotal + settings.deliveryFee) * (1 + settings.taxRate);

    // Save order to database
    const order = await Order.create({
      items: orderItems,
      toppings: toppingIds || [],
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      customer,
      status: 'Pending'
    });

    // 🔥 Fire Socket.io event - notify dispatch panel instantly!
    const io = req.app.get('io');
    io.emit('new_order', {
      message: 'New order received! 🍕',
      order
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    // populate means fetch full product details instead of just ID
    const orders = await Order.find()
      .populate('items.product', 'name')
      .populate('toppings', 'name price')
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      message: 'Orders fetched successfully',
      count: orders.length,
      orders
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3. GET SINGLE ORDER
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name')
      .populate('toppings', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 4. UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // 🔥 Notify everyone about status change via Socket.io
    const io = req.app.get('io');
    io.emit('order_status_update', {
      message: `Order status updated to ${status}`,
      order
    });

    res.status(200).json({
      message: 'Order status updated',
      order
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
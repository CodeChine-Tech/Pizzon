const Order = require('../models/Order');
const Product = require('../models/Product');
const Topping = require('../models/Topping');
const GlobalSettings = require('../models/GlobalSettings');
const sendWhatsApp = require('../utils/whatsapp');
const { sendOrderConfirmation, sendStatusUpdate, sendEmail } = require('../utils/email');
const generateInvoice = require('../utils/generateInvoice');
const safeEmit = require('../utils/socket');

// 1. PLACE NEW ORDER
const placeOrder = async (req, res) => {
  try {
    const { items, toppingIds, customer } = req.body;

    let settings = await GlobalSettings.findOne();
    if (!settings) {
      settings = { taxRate: 0.10, deliveryFee: 2.99, priceMultiplier: 1.0 };
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found` });
      }

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

    if (toppingIds && toppingIds.length > 0) {
      for (const toppingId of toppingIds) {
        const topping = await Topping.findById(toppingId);
        if (topping) subtotal += topping.price;
      }
    }

    const totalPrice = (subtotal + settings.deliveryFee) * (1 + settings.taxRate);

    const newOrder = await Order.create({
      items: orderItems,
      toppings: toppingIds || [],
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      customer,
      status: 'Pending'
    });

    // 🔥 Socket.io
    safeEmit(req, 'new_order', {
      message: 'New order received! 🍕',
      order: newOrder
    });

    // 📱 WhatsApp Notification
    try {
      const whatsappMsg =
`🍕 *Smart Pizza Café*

Assalam o Alaikum ${newOrder.customer.name}!

✅ *Aapka order place ho gaya!*

📦 Order ID: #${newOrder._id.toString().slice(-6).toUpperCase()}
💰 Total: $${newOrder.totalPrice.toFixed(2)}
📍 Status: Pending ⏳

⏱️ Estimated Time: 30-45 minutes
Shukriya! 🙏`;

      await sendWhatsApp(newOrder.customer.phone, whatsappMsg);
    } catch (err) {
      console.log('WhatsApp failed:', err.message);
    }

    // 📧 Email Notification
    try {
      await sendOrderConfirmation(newOrder.customer.email, newOrder);

      // Also send to admin
      const adminSubject = '🍕 New Order Received';
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e8342e;">New Order Alert</h1>
          <p><strong>Customer:</strong> ${newOrder.customer.name}</p>
          <p><strong>Phone:</strong> ${newOrder.customer.phone}</p>
          <p><strong>Email:</strong> ${newOrder.customer.email}</p>
          <p><strong>Order ID:</strong> #${newOrder._id.toString().slice(-6).toUpperCase()}</p>
          <p><strong>Total:</strong> $${newOrder.totalPrice.toFixed(2)}</p>
          <p>Please process the order.</p>
        </div>
      `;
      await sendEmail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);
    } catch (err) {
      console.log('Email failed:', err.message);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 2. GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name')
      .populate('toppings', 'name price')
      .sort({ createdAt: -1 });

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

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    // 🔥 Socket.io
    safeEmit(req, 'order_status_update', {
      message: `Order status updated to ${status}`,
      order
    });

    // 📱 WhatsApp Status Update
    try {
      const statusMessages = {
        Preparing: "👨‍🍳 Aapka order kitchen mein prepare ho raha hai!",
        Ready:     "✅ Order ready! Rider le jane wala hai 🚴",
        Delivered: "🎉 Order deliver ho gaya! Enjoy karo 🍕",
        Cancelled: "❌ Aapka order cancel ho gaya. Maafi chahte hain!"
      };

      if (statusMessages[status]) {
        const msg =
`🍕 *Smart Pizza Café — Order Update*

Order #${order._id.toString().slice(-6).toUpperCase()}
${statusMessages[status]}

Shukriya! 🙏`;

        await sendWhatsApp(order.customer.phone, msg);
      }
    } catch (err) {
      console.log('WhatsApp status failed:', err.message);
    }

    // 📧 Email Status Update
    try {
      await sendStatusUpdate(order.customer.email, order, status);
    } catch (err) {
      console.log('Email status failed:', err.message);
    }

    res.status(200).json({
      message: 'Order status updated',
      order
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 5. RIDER PICKS UP ORDER (Out for delivery)
const pickupOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Mark order as on the way
    order.status = 'Ready';

    // If we have authenticated rider info, store it (optional)
    if (req.user) {
      order.rider = req.user._id;
    }

    await order.save();

    // 🔥 Socket.io broadcast
    safeEmit(req, 'order_status_update', {
      message: 'Order is out for delivery 🚴',
      order
    });

    // 📧 Email + WhatsApp update
    try {
      await sendStatusUpdate(order.customer.email, order, 'Ready');

      const statusMsg =
`🍕 *Smart Pizza Café — Rider is on the way!*\n\nOrder #${order._id.toString().slice(-6).toUpperCase()}\nYour order is now on the way with our rider. Enjoy!\n\nShukriya! 🙏`;
      await sendWhatsApp(order.customer.phone, statusMsg);
    } catch (err) {
      console.log('Pickup notification failed:', err.message);
    }

    res.status(200).json({ message: 'Order marked as out for delivery', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 6. DOWNLOAD INVOICE
const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name')
      .populate('toppings', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    generateInvoice(order, res);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  pickupOrder,
  downloadInvoice
};
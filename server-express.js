const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const toppingRoutes = require('./routes/toppingRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const riderRoutes = require('./routes/riderRoutes');
const couponRoutes = require('./routes/couponRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/rider', riderRoutes);
app.use('/api/coupons', couponRoutes);

app.get('/', (req, res) => {
  res.send('Smart Pizza Café Backend is running! 🍕');
});

let io = null;

const setIo = (serverIo) => {
  io = serverIo;
  app.set('io', io);
};

module.exports = { app, setIo };
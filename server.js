const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const toppingRoutes = require('./routes/toppingRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Import socket handler
const socketHandler = require('./socket/socketHandler');

// Load .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Create express app
const app = express();
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});

// Make io accessible everywhere
app.set('io', io);

// Start socket handler
socketHandler(io);

// Use all routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/settings', settingsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Smart Pizza Café Backend is running! 🍕');
});

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
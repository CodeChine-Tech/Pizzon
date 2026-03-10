const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const toppingRoutes = require('./routes/toppingRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const riderRoutes = require('./routes/riderRoutes');

// Import socket handler
const socketHandler = require('./socket/socketHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

app.set('io', io);
socketHandler(io);

// All routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/rider', riderRoutes);

app.get('/', (req, res) => {
  res.send('Smart Pizza Café Backend is running! 🍕');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
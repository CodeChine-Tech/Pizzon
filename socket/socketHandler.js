const connectedUsers = {};

const socketHandler = (io) => {

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} ✅`);

    // User identifies their role
    socket.on('join', (role) => {
      connectedUsers[socket.id] = role;
      console.log(`${role} joined: ${socket.id}`);
    });

    // 🗺️ Rider sends location from their device
    socket.on('rider_location', (data) => {
      console.log(`Rider location received:`, data);

      // Broadcast to ALL connected users (admin, dispatcher, customer)
      io.emit('rider_location_update', {
        orderId: data.orderId,
        riderId: data.riderId,
        latitude: data.latitude,
        longitude: data.longitude
      });
    });

    // Rider goes offline
    socket.on('rider_offline', (data) => {
      io.emit('rider_offline', data);
      console.log(`Rider offline for order: ${data.orderId}`);
    });

    // User disconnects
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id} ❌`);
      delete connectedUsers[socket.id];
    });

  });

};

module.exports = socketHandler;
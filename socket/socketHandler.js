// 1. Store connected users
const connectedUsers = {};

const socketHandler = (io) => {

  // 2. When someone connects
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} ✅`);

    // 3. When dispatch panel identifies itself
    socket.on('join', (role) => {
      connectedUsers[socket.id] = role;
      console.log(`${role} joined with socket ID: ${socket.id}`);
    });

    // 4. When someone disconnects
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id} ❌`);
      delete connectedUsers[socket.id];
    });
  });

};

module.exports = socketHandler;
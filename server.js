const { app, setIo } = require('./server-express');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./socket/socketHandler');

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

setIo(io);
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
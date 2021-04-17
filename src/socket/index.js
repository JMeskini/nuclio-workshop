const socketio = require('socket.io');

const configureSockets = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });
  io.use((socket, next) =>{
      socket.user = user;
      console.log(`User: ${user.name}`);
      next();
  })

  io.on("connection", (client) => {
    client.emit("connection", "You are now connected");
    client.join(`user-${client.user.id}`);
    console.log(`User: ${client.user.name} has now its session with id ${client.user.id}`)
    client.on("join-chat", (chatId) => {
      client.join(`chat-${chatId}`);
      console.log(`User: ${client.user.name} joined chat ${chatId}`)
    })
  });
  return io;
};




module.exports = configureSockets;

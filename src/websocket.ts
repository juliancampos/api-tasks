import { io } from "./server/http";

interface ChannelUser {
  socketId: string,
  username: string,
  channel: string
}

const users: ChannelUser[] = [];

io.on('connect', (socket) => {
  socket.on('selectedChannel', (data) => {
    const userInChannel = users.find(user => user.username === data.username && user.channel === data.channel);
    if (userInChannel) {
      userInChannel.socketId = socket.id;
      return;
    }

    socket.join(data.channel);

    users.push({
      channel: data.channel,
      username: data.username,
      socketId: socket.id
    })
  });
 
  socket.on('message', (message) => {
    io.emit('messages', message);
  })
});


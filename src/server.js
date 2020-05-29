import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config';
import { createServer } from 'http';
import socketio from 'socket.io';

import { addUser, getCurrentUser, removeUser, getRoomUsers } from './utils/user';
import { formatMessage } from './utils/message';

const { PORT } = config;

const app = express();
const server = createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const botName = 'Chat Bot';

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const {error, user} = addUser(socket.id, name, room);
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('newMessage', formatMessage(botName, `Welcome to Room ${user.room}`));
    socket.broadcast
    .to(user.room)
    .emit('newMessage', formatMessage(botName, `${user.username} has joined the chat`));

    callback();

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

  })

  socket.on('sendMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    if (user) {
      io.to(user.room).emit('newMessage', formatMessage(user.username, msg));
    } 
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('newMessage', formatMessage(botName, `${user.username} has left the chat`));
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
})

//Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

//Catch
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

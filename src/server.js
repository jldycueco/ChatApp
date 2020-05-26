import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config';
import { createServer } from 'http';
import socketio from 'socket.io';

const { PORT } = config;

const app = express();
const server = createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


io.on('connection', (socket) => {
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});

//Serve static files
app.use(express.static(path.join(__dirname, '../client/build')));

//Catch
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

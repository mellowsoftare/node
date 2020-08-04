//v1.0.1
const express = require('express');

const socket = require('socket.io');
const port = process.env.port || 3000;

//App Setup
const app = express();

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // Handle Typing
  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
      console.log(data);
  });

});//End On Connection

var server = app.listen(port, () => {
  console.log('listening to requests on port 3000');
});

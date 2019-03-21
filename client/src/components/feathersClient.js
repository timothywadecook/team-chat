const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');

const socket = io('http://localhost:3030');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));

const userService = app.service('users');

module.exports = {
  userService
}

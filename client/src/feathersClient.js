const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');


const socket = io('http://localhost:3030');
const feathersClient = feathers();

// Set up Socket.io client with the socket
feathersClient.configure(socketio(socket));

feathersClient.configure(auth({
  storage: window.localStorage
}))

module.exports = {
  fc: feathersClient
}

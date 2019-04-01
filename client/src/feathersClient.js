const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socketURI = process.env.NODE_ENV !== "production" ? "http://localhost:3030/" : "https://frontdor.herokuapp.com";

const socket = io(socketURI);
const feathersClient = feathers();

// Set up Socket.io client with the socket
feathersClient.configure(socketio(socket));

feathersClient.configure(auth({
  storage: window.localStorage
}))

module.exports = {
  fc: feathersClient
}

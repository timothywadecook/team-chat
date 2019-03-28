const users = require('./users/users.service.js');
const teams = require('./teams/teams.service.js');
const conversations = require('./conversations/conversations.service.js');
const messages = require('./messages/messages.service.js');
const convostatus = require('./convostatus/convostatus.service.js');
const incomingSms = require('./incoming-sms/incoming-sms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(teams);
  app.configure(conversations);
  app.configure(messages);
  app.configure(convostatus);
  app.configure(incomingSms);
};

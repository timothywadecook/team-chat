const users = require('./users/users.service.js');
const teams = require('./teams/teams.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(teams);
};

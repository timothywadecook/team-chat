// Initializes the `conversations` service on path `/conversations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/conversations.model');
const hooks = require('./conversations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate: {default: 20, max: 50},
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/conversations', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('conversations');

  service.hooks(hooks);
};

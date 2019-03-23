// Initializes the `convostatus` service on path `/convostatus`
const createService = require('feathers-mongoose');
const createModel = require('../../models/convostatus.model');
const hooks = require('./convostatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/convostatus', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('convostatus');

  service.hooks(hooks);
};

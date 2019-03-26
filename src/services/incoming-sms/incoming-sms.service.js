// Initializes the `incoming-sms` service on path `/incoming-sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/incoming-sms.model');
const hooks = require('./incoming-sms.hooks');
const MessagingResponse = require('twilio').twiml.MessagingResponse; // Twilio!

function responseForTwilio(req, res, next) {
  const twiml = new MessagingResponse;
  const msg = twiml.message('thanks for your text!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  // next();
}


module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/incoming-sms', createService(options), responseForTwilio);

  // Get our initialized service so that we can register hooks
  const service = app.service('incoming-sms');

  service.hooks(hooks);
};

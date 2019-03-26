// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const MessagingResponse = require('twilio').twiml.MessagingResponse; // Twilio!


// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    // const twiml = new MessagingResponse;
    // const msg = twiml.message('Thanks for your message :)';
    // context.result.writeHead(200, {'Content-Type': 'text/xml'});
    // context.result.end(twiml.toString());


    return context;
  };
};

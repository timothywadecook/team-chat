// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const {From:from, To:to, Body: text} = context.data

    // Throw an error if we didn't get a text
    if(!text) {
      throw new Error('A message must have a text');
    }

    // Get the teamId based on phone number
    const team = await context.app.service('teams').find({query: {smsNumber: to}})
    teamId=team.data[0]._id;

    // The actual message text
    text
      // Messages can't be longer than 400 characters
      .substring(0, 400);

    console.log(from, to, text,teamId);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      // Set the other data
      teamId,
      to,
      from,
      // Add the current date
      createdAt: new Date().getTime()
    };


    return context;
  };
};



// ****************************************************
// Twilio Route to receive messages
// ****************************************************
// app.post('/api/sms', (req, res) => {
//   const incomingMsg = req.body.Body;
//   const twiml = new MessagingResponse();
//   console.log('Message Received! ', incomingMsg)

//   const msg = twiml.message('Thank you for your text :)')
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// })

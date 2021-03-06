// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // check that message is outbound (not incoming): if senderId is undefined then it is incoming
    // if message was not sent by a user, then do nothing else
    if (!context.data.senderId) {return context}

    const {senderName, conversationId, body} = context.data; // get the message data we need to send outgoing 

    const convo = await context.app.service('conversations').get(conversationId);

    if (convo.type === "incoming") {
      // get the team number for "from"
      const team = await context.app.service('teams').get(convo.teamId);
      const teamSms = team.smsNumber;
      const {activeOutgoing} = convo;
      console.log(' from: and to: number: ', teamSms, activeOutgoing)

      client.messages
      .create({
        body: body,
        from: teamSms,
        to: activeOutgoing
      })
      .then(message => console.log('outgoing message deployed', message.sid));
    }


    return context;
  };
};

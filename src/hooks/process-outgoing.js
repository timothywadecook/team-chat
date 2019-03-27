// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const accountSid = 'AC49ab2323230a124e393feb71472effd4';
const authToken = 'ef0639b5dcb3f163cfbca4dd7e06e500';
const client = require('twilio')(accountSid, authToken);

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
      const team = await context.app.service('teams').get(convo.data.teamId);
      const teamSms = team.data.smsNumber;
      const {activeOutgoing} = convo.data;

      client.messages
      .create({
        body: body,
        from: teamSms,
        to: activeOutgoing
      })
      .then(message => console.log(message.sid));
    }


    return context;
  };
};

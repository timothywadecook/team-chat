// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

// When a message is sent or received, update the conversation status for everyone. 
    const message = context.data;
    console.log('this should be the message via update-convo-statuses..hook', message)

      
// get all userIds for the conversation
    const convoId = message.conversationId;
    const convo = await context.app.service('conversations').get({ _id: convoId })
    const userIds = convo.userIds;

// set the status for sender to "replied", everyone else to "unread"
    let status = {};
    for (let i = 0; i < userIds.length; i++) {
      if (userIds[i] == message.senderId) { // if sender
            status[userIds[i]] = "replied";
          }
          else { status[userIds[i]] = "unread"; } // if not sender
        }
      context.app.service('conversations').patch(convoId, { status: status })

    return context;
  };
};

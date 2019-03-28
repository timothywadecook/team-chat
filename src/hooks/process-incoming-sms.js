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
    // The actual message text
    text
    // Messages can't be longer than 500 characters
    .substring(0, 500);



    // Get the teamId based on the 'to' number
    const team = await context.app.service('teams').find({query: {smsNumber: to}})
    const teamId=team.data[0]._id;

    // Get the conversationId based on the 'from' number
    const convo = await context.app.service('conversations').find({query: {contacts: from}})
    console.log('convo.data[0]', convo.data[0])
    // if conversation already exists then just create a message with that convoId
    if (convo.data[0]) {
      context.app.service('messages').create({
        senderName: from,
        body: text,
        conversationId: convo.data[0]._id,
      })
      // set the activeOutgoing channel as "from" for the associated conversation
        await context.app.service('conversations').patch(convo.data[0]._id, {activeOutgoing: from})
    } else { // if the conversation doesn't exist. create new conversation and new message
        
        const users = await context.app.service('users').find({query: {teamIds: teamId}});
        const userIds = users.data.map(user => user._id);
        console.log('create convo input name, teamId, userIds, preview, contacts', from, teamId, userIds, text.substring(0,30))
        const newConvo = await context.app.service('conversations').create({
          name: from,
          type: "incoming",
          teamId: teamId,
          userIds: userIds,
          preview: text.substring(0,30),
          activeOutgoing: from,
          contacts: [from]
        })
        context.app.service('messages').create({
          senderName: from,
          body: text,
          conversationId: newConvo.data[0]._id
        })
    }



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

    console.log('checkpoint end of process incoming hook', context.data);

    return context;
  };
};

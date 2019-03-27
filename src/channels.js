module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    if(connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;

      // find conversations the user is in and join channel
      app.service('conversations')
        .find({query: {userIds: user._id}})
        .then(({ data: conversations }) => {
          conversations.forEach(convo => {
            app.channel(`conversation-${convo._id}`).join(connection);
          });
        })
        .catch(err => {
          console.log('error getting channels ', err);
        });

      user.teamIds.forEach(teamId => {
        app.channel(`team-${teamId}`).join(connection);
      });

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
    }
  });

  app.publish((data, hook) => {
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // When a conversation is created, publish it to the team
  app.service('conversations').publish('created', (data) => {
    return app.channel(`team-${data.teamId}`);
  });

  // when a message is created publish it on the conversation channel
  app.service('messages').publish('created', data => {
    return app.channel(`conversation-${data.conversationId}`);
  });

  // app.service('teams').publish('created', (data, context) => {
  //   // when a team is created, add a new channel for it
  //   // when team is created, add user who created it to the channel to listen for updates
  //   // console.log('-------------------------------------')
  //   // console.log(context.params.user)
  //   return app.channel(`team-${data._id}`);
  // });
};

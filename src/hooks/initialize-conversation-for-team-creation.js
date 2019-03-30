// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const team = context.result;
    const user = context.params.user;
    // console.log('context result is ', context.result)
    // console.log('context user is ', context.params.user);

    await context.app.service('conversations').create(
      [
        {
          teamId: team._id,
          type: 'group',
          name: 'General',
          userIds: [user._id],
        },
        {
          teamId: team._id,
          type: 'member',
          name: `${user.name} (you)`,
          userIds: [user._id],
        },
      ],
    );

    return context;
  };
};

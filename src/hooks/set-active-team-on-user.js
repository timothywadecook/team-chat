// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const team = context.result;
    const user = context.params.user;

    await context.app.service('users').patch(user._id, {
      activeTeamId:  team._id,
    });

    return context;
  };
};

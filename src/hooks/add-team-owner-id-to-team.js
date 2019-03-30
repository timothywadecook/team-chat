// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const user = context.params.user;
    console.log('is user what he thinks it is is this user?', user)

    context.data.memberIds = [user._id];

    return context;
  };
};

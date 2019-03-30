module.exports = function () {
  return async context => {
    const team = context.result;
    const user = context.params.user;

    let addedTeamIds = user.teamIds.concat(team._id);

    await context.app.service('users').patch(user._id, {
      teamIds: addedTeamIds
    });

    return context;
  };
};

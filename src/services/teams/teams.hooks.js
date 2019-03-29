const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

const setActiveTeamOnUser = require('../../hooks/set-active-team-on-user');
const associateTeamToOwner = require('../../hooks/associate-team-to-owner');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      // add the currently authenticated user to the data as ownerId
      hooks.associateCurrentUser({ as: 'ownerId' })
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      setActiveTeamOnUser(),
      associateTeamToOwner(),
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

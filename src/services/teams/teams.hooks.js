const { authenticate } = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

const setActiveTeamOnUser = require('../../hooks/set-active-team-on-user');
const associateTeamToOwner = require('../../hooks/associate-team-to-owner');
const addTeamOwnerIdToTeam = require('../../hooks/add-team-owner-id-to-team');

const initializeConversationForTeamCreation = require('../../hooks/initialize-conversation-for-team-creation');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      hooks.associateCurrentUser({ as: 'ownerId' }),
      addTeamOwnerIdToTeam(),
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
      initializeConversationForTeamCreation()
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

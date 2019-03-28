const { authenticate } = require('@feathersjs/authentication').hooks;

const processOutgoing = require('../../hooks/process-outgoing');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      // function(context) {
      //   context.params.query = { $limit: 50 };
      //   return context;
      // }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [processOutgoing()],
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

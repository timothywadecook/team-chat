const { authenticate } = require('@feathersjs/authentication').hooks;

const processOutgoing = require('../../hooks/process-outgoing');

const setPreview = require('../../hooks/set-preview');

const updateConvoStatuses4TeamOnNewMessage = require('../../hooks/update-convo-statuses-4team-on-new-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
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
    create: [processOutgoing(), setPreview(), updateConvoStatuses4TeamOnNewMessage()],
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

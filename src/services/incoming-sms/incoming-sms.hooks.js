

const processIncomingSms = require('../../hooks/process-incoming-sms');

const resfortwilio = require('../../hooks/resfortwilio');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processIncomingSms()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [resfortwilio()],
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



// const processIncomingSms = require('../../hooks/process-incoming-sms');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      // processIncomingSms()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [() => {console.log('incoming sms stuff done')}],
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

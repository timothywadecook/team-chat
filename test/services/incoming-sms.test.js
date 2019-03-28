const assert = require('assert');
const app = require('../../src/app');

describe('\'incoming-sms\' service', () => {
  it('registered the service', () => {
    const service = app.service('incoming-sms');

    assert.ok(service, 'Registered the service');
  });
});

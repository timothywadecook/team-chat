const assert = require('assert');
const app = require('../../src/app');

describe('\'convostatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('convostatus');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const feathers = require('@feathersjs/feathers');
// const processOutgoing = require('../../src/hooks/process-outgoing');

describe.skip('\'process-outgoing\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: processOutgoing()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');

    assert.deepEqual(result, { id: 'test' });
  });
});

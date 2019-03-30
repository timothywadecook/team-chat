const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const updateConvoStatuses4TeamOnNewMessage = require('../../src/hooks/update-convo-statuses-4team-on-new-message');

describe('\'update-convo-statuses-4team-on-new-message\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: updateConvoStatuses4TeamOnNewMessage()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});

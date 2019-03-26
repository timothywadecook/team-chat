const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processIncomingSms = require('../../src/hooks/process-incoming-sms');

describe('\'process-incoming-sms\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processIncomingSms()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});

const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const setActiveTeamOnUser = require('../../src/hooks/set-active-team-on-user');

describe('\'setActiveTeamOnUser\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: setActiveTeamOnUser()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});

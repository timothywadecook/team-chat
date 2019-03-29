var expect = require('chai').expect;
var assert = require('chai').assert;
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const associateTeamToOwner = require('../../src/hooks/associate-team-to-owner');

describe('\'associateTeamToUser\' hook', () => {
  let app, user;

  beforeEach(() => {
    const options = {
      id: '_id',
      startId: '32',
    };

    app = feathers();

    // Register `users` and `teams` service in-memory
    app.use('/users', memory(options));
    app.use('/teams', memory(options));

    app.service('teams').hooks({
      after: associateTeamToOwner()
    });
  });

  it('sets the active team on the user to the recently created team', async () => {
    // Create a new user we can use to test with
    user = await app.service('users').create({
      email: 'test@user.com',
      name: 'Test User',
      password: 'password',
      teamIds: []
    });

    const params = { user };

    const team = await app.service('teams').create({ '_id': 45, name: 'Mylo' }, params);

    let refreshUser = await app.service('users').get(32);

    assert.lengthOf(refreshUser.teamIds, 1, 'The user should have one team inside the array of team ids');
    expect(refreshUser.teamIds).to.include(45);
  });
});

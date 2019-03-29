var assert = require('chai').assert;
var expect = require('chai').expect;
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const addTeamOwnerIdToTeam = require('../../src/hooks/add-team-owner-id-to-team');

describe('\'addTeamOwnerIdToTeam\' hook', () => {
  let app, user;

  beforeEach(() => {
    app = feathers();

    const options = {
      id: '_id',
      startId: '16',
    };

    // Register `users` and `teams` service in-memory
    app.use('/users', memory(options));
    app.use('/teams', memory(options));

    app.service('teams').hooks({
      before: addTeamOwnerIdToTeam()
    });
  });

  it('adds the owner of the team into the array of members for the team', async () => {
    user = await app.service('users').create({
      email: 'test@user.com',
      name: 'Test User',
      password: 'password',
      teamIds: []
    });

    const params = { user };
    const team = await app.service('teams').create({ name: 'Testing Member Insertions'}, params);

    assert.lengthOf(team.memberIds, 1, 'Expected length member ids to be at least one');
    expect(team.memberIds).to.include(16);
  });
});

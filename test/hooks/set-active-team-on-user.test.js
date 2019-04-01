var expect = require('chai').expect;
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const setActiveTeamOnUser = require('../../src/hooks/set-active-team-on-user');

describe('\'setActiveTeamOnUser\' hook', () => {
  let app, user;

  beforeEach(async () => {
    const options = {
      id: '_id',
      startId: 2,
    };

    app = feathers();

    // Register `users` and `teams` service in-memory
    app.use('/users', memory(options));
    app.use('/teams', memory(options));

    app.service('teams').hooks({
      after: setActiveTeamOnUser()
    });
  });

  it('sets the active team on the user to the recently created team', async () => {
    // Create a new user we can use to test with
    user = await app.service('users').create({
      email: 'test@user.com',
      name: 'Test User',
      password: 'password',
    });

    const params = { user };

    const team = await app.service('teams').create({ name: 'Mylo' }, params);

    const freshUser = await app.service('users').get(2);

    expect(freshUser.activeTeamId).to.equal(team._id);
    expect(freshUser.activeTeamId).to.equal(2);
  });
});

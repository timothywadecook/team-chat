var expect = require('chai').expect;
var assert = require('chai').assert;
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const initializeConversationForTeamCreation = require('../../src/hooks/initialize-conversation-for-team-creation');

describe('\'initializeConversationForTeamCreation\' hook', () => {
  let app, user;

  beforeEach(() => {
    const options = {
      id: '_id',
      startId: '32',
      multi: true,
    };

    app = feathers();

    // Register `users` and `teams` service in-memory
    app.use('/users', memory(options));
    app.use('/teams', memory(options));
    app.use('/conversations', memory(options));

    app.service('teams').hooks({
      after: initializeConversationForTeamCreation()
    });
  });

  it('creates two conversations when a team is created', async () => {
    // Create a new user we can use to test with
    user = await app.service('users').create({
      email: 'test@user.com',
      name: 'Test User',
      password: 'password',
      teamIds: []
    });

    const params = { user };

    const team = await app.service('teams').create({ '_id': 45, name: 'Mylo' }, params);

    const convos = await app.service('conversations').find({
      query: {
        teamId: team._id
      }
    });

    assert.lengthOf(convos, 2, 'Expected to have two conversations created that belong to the team');
  });
});

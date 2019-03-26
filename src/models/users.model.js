// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    // The user's display name
    name: {
      type: String,
      required: 'Name is required',
    },

    // the users primary email for the application
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Email is required.',
      trim: true,
    },

    // The user's password (duh!)
    password: {
      type: String,
      trim: true,
      minLength: [7, 'Password must be at least 7 characters long.'],
    },

    // This is the current team id flag for the current user
    activeTeamId: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: "teams",
      default: null,
    },

    // This is the list of teams ids that a user is on
    teamIds: { type: [ mongooseClient.Schema.Types.ObjectId ], ref: "teams" }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};

// teams-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const teams = new Schema({
    // the team name
    name: { type: String, required: true },

    // The id of the user that owns the model
    ownerId: {
      type: mongooseClient.Schema.Types.ObjectId
      //required: true,
    },

    // This is the list of conversation ids that belong to team
    conversationIds: { type: [ mongooseClient.Schema.Types.ObjectId ] },
  }, {
    timestamps: true
  });

  return mongooseClient.model('teams', teams);
};

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
<<<<<<< HEAD
      type: mongooseClient.Schema.Types.ObjectId
      //required: true,
=======
      type: mongooseClient.Schema.Types.ObjectId,
      ref: "users",
      required: true,
>>>>>>> 984993eb998b59d594485a0336d2f224e363f1f4
    },

    // This is the list of conversation ids that belong to team
    conversationIds: { type: [ mongooseClient.Schema.Types.ObjectId ], ref: "conversations" },
  }, {
    timestamps: true
  });

  return mongooseClient.model('teams', teams);
};

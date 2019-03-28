// incoming-sms-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const incomingSms = new Schema({
    text: { type: String, required: true },
    teamId: {type: mongooseClient.Schema.Types.ObjectId, ref: 'teams', required: 'is phone number assocated with team?'},
    to: { type: String, required: true },
    from: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('incomingSms', incomingSms);
};

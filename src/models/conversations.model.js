// conversations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const conversations = new Schema({
    name: { 
      type: String, 
      required: true 
    },
    messagesIds: { type: [ mongooseClient.Schema.Types.ObjectId ], ref: "messages" },
    userIds: { type: [ mongooseClient.Schema.Types.ObjectId ], ref: "users" },
    preview: {
      type: String,
      trim: true,
      maxlength: [30, "Preview must be less than 30 characters long."],
      default: "Start a new conversation",
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('conversations', conversations);
};

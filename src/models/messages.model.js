// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    body: { 
      type: String, 
      required: true,
      maxlength: [500, "Message must be less than 500 characters"]
    },
    senderId: { type: mongooseClient.Schema.Types.ObjectId, ref: "users" },
    senderName: {
      type: String,
      required: "Name is required"
    },
    conversationId: mongooseClient.Schema.Types.ObjectId
  }, {
    timestamps: true
  });

  return mongooseClient.model('messages', messages);
};

// convostatus-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const convostatus = new Schema({
    conversationId: {type: [ mongooseClient.Schema.Types.ObjectId ], ref: "conversations" },
    userId: {type: [ mongooseClient.Schema.Types.ObjectId ], ref: "users" },
    status: {
      type: String,
      required: "conversation status is required",
      enum: ["unread", "unreplied", "replied"],
      default: "unread"
    },
    silence: {
      types: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('convostatus', convostatus);
};

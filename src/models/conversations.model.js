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
      required: false 
    },
    type: {
      type: String,
      enum: ["group", "member", "incoming"],
      required: true
    },
    teamId: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: "team",
      required: "teamId required"
    },
    userIds: { type: [ mongooseClient.Schema.Types.ObjectId ], ref: "users" },
    preview: {
      type: String,
      trim: true,
      maxlength: [30, "Preview must be less than 30 characters long."],
      default: "Start a new conversation",
      required: true
    },
    status: {
      type: Object,
      default: {}
    },
    activeOutgoing: String,
    contacts: {
      type: Array,
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('conversations', conversations);
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const message = context.data;
    const {senderId, body, senderName, conversationId} = message;
    let preview;
    if (body.length > 30) {
      preview = body.substring(0,30)
    } else {preview = body}

    context.app.service('conversations').patch(conversationId, {preview: preview})
    return context;
  };
};

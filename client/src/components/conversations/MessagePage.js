import React from "react";
import MessageBar from './MessageBar';
import MessageBoard from './MessageBoard';
import { fc } from "../../feathersClient";

class MessagePage extends React.Component {
  state = {
    messages: [],
    messageInput: ""
  };

  changeHandler = event => {
    this.setState({ messageInput: event.target.value });
  };

  clickHandler = event => {
    event.preventDefault();
    fc.service("messages")
      .create({
        body: this.state.messageInput,
        senderId: this.props.activeUser._id,
        senderName: this.props.activeUser.name,
        conversationId: this.props.convoId
      })
      .then((data) => {
        fc.service('conversations')
          .find({ query: { _id: this.props.convoId } })
          .then((response) => {
            const userIds = response.data[0].userIds;
            let status = {};
            for (let i = 0; i < userIds.length; i++) {
              if (userIds[i] === data.senderId) {
                status[userIds[i]] = "replied";
              }
              else {status[userIds[i]] = "unread";}
            }
            fc.service('conversations').patch(data.conversationId, { status: status })

            let preview = data.body;
            if (preview.length > 30) {
              preview = preview.substring(0, 30);
            }
            fc.service("conversations").patch(this.props.convoId, { preview: preview })
            this.getMessages();
            this.setState({ messageInput: "" });
          });
      });
  };

  addMessageToConversation = (message) => {
    if (this.props.convoId === message.conversationId) {
      this.setState({ messages: [...this.state.messages, message] });
    }
  }

  componentDidMount() {
    this.getMessages();
    // listen for new messages
    fc.service('messages').on('created', this.addMessageToConversation);
  }

  componentDidUpdate(prevProps) {
    if (this.props.convoId !== prevProps.convoId) {
      this.getMessages();
    }
  }

  getMessages() {
    fc.service("messages")
      .find({ query: { conversationId: this.props.convoId } })
      .then(convo => {
        this.setState({ messages: convo.data });
      });
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <MessageBoard messages={this.state.messages} activeUser={this.props.activeUser} />
=======
      <React.Fragment>
        <MessageBoard messages={this.state.messages} activeUser={this.props.activeUser}/>
>>>>>>> 2499ec8f5ad773e18a91576b9bea98fc0c87f20d
        <div className="px-4 border-top d-flex pb-4 bg-light conversation-view-footer fixed-bottom">
          <MessageBar
            changeHandler={this.changeHandler}
            clickHandler={this.clickHandler}
            value={this.state.messageInput}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MessagePage;

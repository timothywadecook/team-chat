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
          let preview = data.body;
          if(preview.length > 30){
            preview = preview.substring(0, 30);
          }
          fc.service("conversations").patch(this.props.convoId, {preview: preview})
        this.getMessages();
        this.setState({messageInput: ""});
      });
  };

  addMessageToConversation = (message) => {
    if(this.props.convoId === message.conversationId) {
      this.setState({ messages: [...this.state.messages, message] });
    }
  }

  componentDidMount() {
    this.getMessages();
    // listen for new messages
    fc.service('messages').on('created', this.addMessageToConversation);
  }

  componentDidUpdate(prevProps){
    if(this.props.convoId !== prevProps.convoId){
        this.getMessages();
    }
  }

  getMessages() {
    fc.service("messages")
      .find({ query: { conversationId: this.props.convoId } })
      .then(convo => {
        console.log(convo.data);
        this.setState({ messages: convo.data});
      });
  }

  render() {
    return (
      <div>
        <MessageBoard messages={this.state.messages} activeUser={this.props.activeUser}/>
        <div className  ="px-4 border-top d-flex pb-4 bg-light conversation-view-footer fixed-bottom">
          <MessageBar
            changeHandler={this.changeHandler}
            clickHandler={this.clickHandler}
            value={this.state.messageInput}
          />
        </div>
      </div>
    );
  }
}

export default MessagePage;

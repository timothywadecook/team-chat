import React from "react";
import MessageBar from './MessageBar';
import MessageBoard from './MessageBoard';
import { fc } from "../../feathersClient";

class MessagePage extends React.Component {
  state = {
    messageInput: "",
  };

  changeHandler = event => {
    this.setState({ messageInput: event.target.value });
  };

  clickHandler = event => {
    event.preventDefault();
    console.log('this should be only once. in MessagePage')
    fc.service("messages")
      .create({
        body: this.state.messageInput,
        senderId: this.props.activeUser._id,
        senderName: this.props.activeUser.name,
        conversationId: this.props.conversationId
      })
      .then((data) => {
        console.log('message created', data)
        this.setState({ messageInput: "" });
      });
  };

  render() {
    return (
      <React.Fragment>
        <MessageBoard convoType={this.props.convoType} messages={this.props.messages} activeUser={this.props.activeUser} />
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

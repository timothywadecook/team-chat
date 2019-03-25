import React from "react";
import { fc } from "../../feathersClient";

const MessageBar = props => (
  <form>
    <input onChange={props.changeHandler} value={props.value}/>
    <button onClick={props.clickHandler}>Send</button>
  </form>
);

const MessageBoard = props => (
  <div>
    {props.messages &&
      props.messages.map(message => <Message key={message._id} name={message.senderName} body={message.body} />)}
  </div>
);

const Message = props => (
  <div>
    <h3>{props.name}</h3>
    <p>{props.body}</p>
  </div>
);

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
    console.log(this.props.activeUser);
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

  componentDidMount() {
    this.getMessages();
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
        <MessageBoard messages={this.state.messages} />
        <MessageBar
          changeHandler={this.changeHandler}
          clickHandler={this.clickHandler}
          value={this.state.messageInput}
        />
      </div>
    );
  }
}

export default MessagePage;

import React from "react";
import Message from './Message';

class MessageBoard extends React.Component{

  componentDidMount(){
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps){
    if(this.props.messages.length !== prevProps.messages.length){
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render () {
    return (
      <div className="conversation-body">
          {this.props.messages &&
            this.props.messages.map(message => <Message key={message._id} convoType={this.props.convoType} name={message.senderName} body={message.body} activeUser={this.props.activeUser} id={message.senderId}/>)}
            <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
            </div>
      </div>
    )
  }
}


export default MessageBoard;

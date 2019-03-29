import React from "react";
import Message from './Message';

const MessageBoard = props => (
  <div className="conversation-body">
    {props.messages &&
      props.messages.map(message => 
        <Message 
          key={message._id} 
          convoType={props.convoType} 
          name={message.senderName} 
          body={message.body} 
          activeUser={props.activeUser} 
          id={message.senderId}/>)}
  </div>
);

export default MessageBoard;

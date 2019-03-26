import React from "react";
import Message from './Message';

const MessageBoard = props => (
  <div>
    {props.messages &&
      props.messages.map(message => <Message key={message._id} name={message.senderName} body={message.body} activeUser={props.activeUser} id={message.senderId}/>)}
  </div>
);

export default MessageBoard;

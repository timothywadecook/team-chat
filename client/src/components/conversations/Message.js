import React from "react";

const Message = props => (
  props.id === props.activeUser._id ?
    <div className="row justify-content-end bounce-in-left">
      <div className="card messageBubble myMessage text-white">
        <div className="card-body">
          <p className="card-text message-text">{props.body}</p>
          <h5 className="card-title message-sender senderName">{props.name}</h5>
        </div>
      </div>
    </div>
    :
    <div className="card messageBubble theirMessage bounce-in-right">
      <div className="card-body">
        <h5 className="card-title message-sender">{props.name}</h5>
        <p className="card-text message-text">{props.body}</p>
      </div>
    </div>
);

export default Message;

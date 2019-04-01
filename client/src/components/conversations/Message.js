import React from "react";
import { PromiseProvider } from "mongoose";

// 
// NOTE: this message component is designed to work for both
// Team messages AND Customer/incoming messages...hence the nested ternary 

const Message = props => (
  props.convoType === "incoming" ? ( // if customer conversation....
    props.id ?
  // right side
    <div className="row justify-content-end bounce-in-left">
      <div className="card messageBubble myMessage text-white">
        <div className="card-body">
          <p className="card-text message-text">{props.body}</p>
          <h5 className="card-title message-sender senderName">{props.name}</h5>
        </div>
      </div>
    </div>
    :
    // left side  
    <div className="card messageBubble theirMessage bounce-in-right">
      <div className="card-body">
        <h5 className="card-title message-sender">{props.name}</h5>
        <p className="card-text message-text">{props.body}</p>
      </div>
    </div>
  ) : ( // if not customer conversation
    props.id === props.activeUser._id ?
    // right side
      <div className="row justify-content-end bounce-in-left">
        <div className="card messageBubble myMessage text-white">
          <div className="card-body">
            <p className="card-text message-text">{props.body}</p>
            <h5 className="card-title message-sender senderName">{props.name}</h5>
          </div>
        </div>
      </div>
      :
      // left side  
      <div className="card messageBubble theirMessage bounce-in-right">
        <div className="card-body">
          <h5 className="card-title message-sender">{props.name}</h5>
          <p className="card-text message-text">{props.body}</p>
        </div>
      </div>
  )
  
);


export default Message;

import React from "react";

const Message = props => (
  props.id === props.activeUser._id ?
    <div className="row justify-content-end">
      <div className="card messageBubble myMessage bg-primary text-white">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.body}</p>
        </div>
      </div>
    </div>
    :
    <div className="card messageBubble theirMessage bg-success text-white">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.body}</p>
      </div>
    </div>
);

export default Message;

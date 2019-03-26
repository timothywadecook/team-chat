import React from "react";

const Message = props => (
  <div>
    <h3>{props.name}</h3>
    <p>{props.body}</p>
  </div>
);

export default Message;

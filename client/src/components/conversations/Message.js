import React from "react";
import { PromiseProvider } from "mongoose";


const Bubble = props => (
  <div className={props.justify}>
    <div className={"card messageBubble text-white " + props.format}>
     <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <p className="card-text">{props.body}</p>
     </div>
    </div>
  </div>
);


const Message = props => (
  props.convoType === "incoming" ? 
    (props.id ? 
      (<Bubble {...props} justify="row justify-content-end" format="myMessage bg-primary" />) : 
      (<Bubble {...props} justify="" format="theirMessage bg-success" />)) : 
    (props.id===props.activeUser._id ? 
      (<Bubble {...props} justify="row justify-content-end" format="myMessage bg-primary" />) : 
      (<Bubble {...props} justify="" format="theirMessage bg-success" />)) 
  );
    







export default Message;

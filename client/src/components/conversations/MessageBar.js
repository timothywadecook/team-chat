import React from "react";

const MessageBar = props => (
  <form className="form-inline">
    <input className="" onChange={props.changeHandler} value={props.value}/>
    <button className="" onClick={props.clickHandler}>Send</button>
  </form>
);

export default MessageBar;

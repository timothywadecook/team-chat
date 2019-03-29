import React from "react";
import {Form, Input, FormGroup, Button} from "reactstrap";

const MessageBar = props => (
  <Form className="sendMessage">
    <FormGroup> 
      <Input className="sendInput" onChange={props.changeHandler} value={props.value} type="text"/>
      <Button color="secondary" className="sendBtn" onClick={props.clickHandler} type="submit">Send</Button>
    </FormGroup>
  </Form>
);

export default MessageBar;

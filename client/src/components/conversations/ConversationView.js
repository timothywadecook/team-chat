import React from 'react';
import MessagePage from './MessagePage';
import { fc } from '../../feathersClient';
import { Nav, Jumbotron } from "reactstrap";
import { userInfo } from 'os';

class ConversationView extends React.Component {

  render() {
    // want convo.type, convo.name, convo.id, updateMessages
    const { conversation } = this.props;
    console.log('this should be null or undefined ', conversation)

    return conversation ?
      (<div className="col-8 pl-0 pr-0" id='conversation-view'>
      <Nav className="navbar bg-light d-flex justify-content-center sticky-top">
        <span className="navbar-brand" href="#">{conversation.name}</span>
      </Nav>
        <MessagePage convoType={conversation.type} {...this.props}/>
      </div>)
      :
      (<div className="col-8 pl-0 pr-0" id='conversation-view'>
      <Nav className="navbar bg-light d-flex justify-content-center sticky-top">
        <span className="navbar-brand" href="#">{"Welcome, " + this.props.activeUser.name}</span>
      </Nav>
      <MessagePage {...this.props}/>
      </div>);
  }
}

export default ConversationView;

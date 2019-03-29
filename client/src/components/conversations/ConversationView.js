import React from 'react';
import MessagePage from './MessagePage';
import { fc } from '../../feathersClient';
import { Nav, Jumbotron } from "reactstrap";

class ConversationView extends React.Component {
  state = {
    conversation: null,
    error: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversationId !== prevProps.conversationId) {
      this.fetchMessages(this.props.conversationId);
    }
  }

  fetchMessages = (id) => {
    fc.service('conversations').get(id).then(response => {
      const conversationData = response
      console.log(conversationData)
      if(conversationData.type === "member" && conversationData.userIds.length > 1) {
        conversationData.name = conversationData.name.replace(this.props.activeUser.name, "")
      }
      this.setState({ conversation: conversationData })
    }).catch(err => {
      this.setState({ error: err })
    })
  }

  render() {
    const { conversation } = this.state;

    return conversation  ?
      (<div className="col-8 pl-0" id='conversation-view'>
      <Nav className="navbar bg-light d-flex justify-content-center sticky-top">
        <span className="navbar-brand" href="#">{conversation.name}</span>
      </Nav>
        <MessagePage {...this.props}/>
      </div>)
      :
      (<Jumbotron className="viewConvoJumbo">
        <p className="lead">Click on a convo to view</p>
      </Jumbotron>);
  }
}

export default ConversationView;

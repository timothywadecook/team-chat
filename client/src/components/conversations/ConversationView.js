import React from 'react';
import MessagePage from './MessagePage';
import { fc } from '../../feathersClient';

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
      console.log(response)
      this.setState({ conversation: response })
    }).catch(err => {
      this.setState({ error: err })
    })
  }

  render() {
    const { conversation } = this.state;

    return conversation  ?
      (<div className="col-8 pl-0" id='conversation-view'>
        <nav className="navbar navbar-light bg-light d-flex justify-content-center sticky-top">
          <span className="navbar-brand" href="#">{conversation.name}</span>
        </nav>
        <MessagePage convoId={this.props.conversationId} activeUser={this.props.activeUser}/>
      </div>)
      :
      (<div>Click on a convo to view</div>);
  }
}

export default ConversationView;

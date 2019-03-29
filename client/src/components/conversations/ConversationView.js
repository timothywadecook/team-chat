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
    if (conversation ) {
      console.log('look look conversation type check ', conversation.type)
    }

    return conversation  ?
      (<div className="col-8 pl-0" id='conversation-view'>
        <nav className="navbar navbar-light bg-light d-flex justify-content-center sticky-top">
          <span className="navbar-brand" href="#">{conversation.name}</span>
        </nav>
        <MessagePage convoType={conversation.type} convoId={this.props.conversationId} activeUser={this.props.activeUser}/>
      </div>)
      :
      (<div>Click on a convo to view</div>);
  }
}

export default ConversationView;

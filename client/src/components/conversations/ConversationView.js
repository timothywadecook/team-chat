import React from 'react';
import MessagePage from './MessagePage';
import { fc } from '../../feathersClient';

class ConversationView extends React.Component {
  // state = {
  //   conversation: null,
  //   error: null
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.conversationId !== prevProps.conversationId) {
  //     this.fetchMessages(this.props.conversationId);
  //   }
  // }

  // fetchMessages = (id) => {
  //   fc.service('conversations').get(id).then(response => {
  //     const conversationData = response;
  //     if(conversationData.type === "member" && conversationData.userIds.length > 1) {
  //       conversationData.name = conversationData.name.replace(this.props.activeUser.name, "")
  //     }
  //     this.setState({ conversation: conversationData })
  //   }).catch(err => {
  //     this.setState({ error: err })
  //   })
  // }

  render() {
    // want convo.type, convo.name, convo.id, updateMessages
    const { conversation } = this.props;

    return conversation  ?
      (<div className="col-8 pl-0" id='conversation-view'>
        <nav className="navbar navbar-light bg-light d-flex justify-content-center sticky-top">
          <span className="navbar-brand" href="#">{conversation.name}</span>
        </nav>
        <MessagePage convoType={conversation.type} getMessages={this.props.getMessages} convoId={this.props.conversationId} activeUser={this.props.activeUser} messages={this.props.messages}/>
      </div>)
      :
      (<div>Click on a convo to view</div>);
  }
}

export default ConversationView;

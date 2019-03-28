import React from 'react';
import { fc } from '../../feathersClient';
import TeamHeader from '../headers/TeamHeader';
import GroupHeader from '../headers/GroupHeader';
import MemberHeader from '../headers/MemberHeader';
import CustomerHeader from "../headers/CustomerHeader";
import ConversationView from '../conversations/ConversationView';
import TeamListItem from '../TeamListItem';

// this.props =  activeTeamId, activeUser,  teamCreate, teamNameInput, teamName, {...props}
class TeamPage extends React.Component {
  state = {
    messages: [],
    teamMembers: [],
    teamName: '',
    groupConvos: [],
    memberConvos: [],
    customerConvos: [],
    messageView: false,
    activeConvoId: '',
    groupName: "",
    groupModal: false,
    userEmail: "",
    userModal: false,
  };

  // we need to 
  unreadToUnreplied = async () => {
    let statusPath = `status.${this.props.activeUser._id}`;
    const changeStatus = await fc.service('conversations').patch(this.state.activeConvoId, { [statusPath] : "unreplied"})
    console.log('unread to unreplied for active user?', statusPath, changeStatus )
  }

  updateConvoStatus = (message) => {
    const convoId = message.conversationId;
    fc.service('conversations')
      .get({ _id: convoId })
      .then((convo) => {
        const userIds = convo.userIds;
        let status = {};
        console.log('user ids', userIds)
        for (let i = 0; i < userIds.length; i++) {
          if (userIds[i] === message.senderId) {
            status[userIds[i]] = "replied";
          }
          else { status[userIds[i]] = "unread"; }
        }
        if (status && status[this.props.activeUser._id] === "unread" && this.state.activeConvoId === message.conversationId) {
          status[this.props.activeUser._id] = "unreplied"
        }
        fc.service('conversations').patch(convoId, { status: status })
        console.log(' status for conversation', status, convoId)
      })
  }


  // this is called when client hears that a new message was created. so it updates state and triggers re render
  addMessageToConversation = async (message) => {
    if (this.state.activeConvoId === message.conversationId) {
      await this.setState({ messages: [...this.state.messages, message] })
    }
    this.updateConvoStatus(message);
  }

  getMessages = () => {
    fc.service("messages")
      .find({ query: { conversationId: this.state.activeConvoId } })
      .then(messages => {
        this.setState({ messages: messages.data });
      });
  }



  getData = async (teamId, user) => {
    const team = await fc.service('teams').get({ _id: teamId });
    const teamName = team.name;
    let teamMembers = await fc.service('users').find({ query: { teamIds: teamId } });
    let groupConvos = await fc
      .service('conversations')
      .find({ query: { teamId: teamId, userIds: user._id, type: 'group' } });
    let memberConvos = await fc
      .service('conversations')
      .find({ query: { teamId: teamId, userIds: user._id, type: 'member' } });
    memberConvos = memberConvos.data;
    for (let i = 1; i < memberConvos.length; i++) {
      memberConvos[i].name = memberConvos[i].name.replace(this.props.activeUser.name, "");
    }
    groupConvos = groupConvos.data;
    teamMembers = teamMembers.data;
    // create the member to member threads between the new member and all other members
    if (memberConvos.length === 0) {
      // create the "(you)" thread for a user upon first login on new team
      const myConvo = await fc
        .service('conversations')
        .create({ teamId: teamId, type: 'member', name: user.name + ' (you)', userIds: user._id });
      console.log('myconvo ', myConvo);
      memberConvos.push(myConvo);

      for (let i = 0; i < teamMembers.length; i++) {
        if (user._id !== teamMembers[i]._id) {
          const convo = await fc.service('conversations').create({
            name: user.name + ' ' + teamMembers[i].name,
            userIds: [user._id, teamMembers[i]._id],
            type: 'member',
            teamId: teamId
          });
          memberConvos.push(convo);
        }
      }

    }
    if (groupConvos.length === 0) {
      groupConvos = await fc
        .service('conversations')
        .patch(
          null,
          { $push: { userIds: user._id } },
          { query: { teamId: teamId, type: 'group' } },
        );
    }
    // get customer conversations (aka "incoming")
    const customerConvos = await fc.service('conversations').find({ query: { teamId: teamId, type: 'incoming' } })
    console.log('customer convos data again', customerConvos.data);
    // if the status doesn't exist yet set the default status for activeUser on the convo to replied
    for (let i = 0; i<groupConvos.length; i++) {
      if (!groupConvos[i].status) {
        groupConvos[i].status = {};
      }
      if (!groupConvos[i].status[user._id]) {
        groupConvos[i].status[user._id] = "replied"
        fc.service('conversations').patch(groupConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }
    for (let i = 0; i<memberConvos.length; i++) {
      if (!memberConvos[i].status) {
        memberConvos[i].status = {};
      }
      if (!memberConvos[i].status[user._id]) {
        memberConvos[i].status[user._id] = "replied"
        fc.service('conversations').patch(memberConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }
    for (let i = 0; i<customerConvos.length; i++) {
      if (!customerConvos[i].status) {
        customerConvos[i].status = {};
      }
      if (!customerConvos[i].status[user._id]) {
        customerConvos[i].status[user._id] = "replied"
        fc.service('conversations').patch(customerConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }


    this.setState({
      teamMembers: teamMembers,
      teamName: teamName,
      groupConvos: groupConvos,
      memberConvos: memberConvos,
      customerConvos: customerConvos.data || []
    });
  };

  componentDidMount() {
    const user = this.props.activeUser;
    const teamId = this.props.activeTeamId;
    this.getData(teamId, user);

    // Listen to created conversation and add the new convo in real-time
    fc.service('conversations').on('created', this.addConversation);
    // listen for new messages
    fc.service('messages').on('created', this.addMessageToConversation);
  }

  componentDidUpdate(prevProps, prevState) {
    const user = this.props.activeUser;
    const teamId = this.props.activeTeamId;
    if (
      prevProps.activeUser !== this.props.activeUser ||
      prevProps.activeTeamId !== this.props.activeTeamId ||
      prevState.teamMembers.length !== this.state.teamMembers.length
    ) {
      this.getData(teamId, user);
    }
    // if activeConvoId changes then run get messages to update state
    if (this.state.activeConvoId !== prevState.activeConvoId) {
      this.getMessages();
      this.unreadToUnreplied();
    }
  }

  /**
   * Add a message to state
   */
  addConversation = convo => {
    if (convo.type === 'group') {
      this.setState({ groupConvos: this.state.groupConvos.concat([convo]) });
    } else if (convo.type === 'member' && convo.userIds.includes(this.props.activeUser._id)) {
      this.setState({ memberConvos: this.state.memberConvos.concat([convo]) });
    }
  };

  groupNameChange = (event) => {
    this.setState({ groupName: event.target.value });
  }

  addGroup = (e) => {
    e.preventDefault();
    fc.service('conversations')
      .create({
        name: this.state.groupName,
        type: 'group',
        teamId: this.props.activeTeamId,
        userIds: this.state.teamMembers
      })
      .then(async newGroup => {
        // console.log('this.props', this.props.activeUser.name);
        const groupConvos = await fc
          .service('conversations')
          .find({
            query: {
              teamId: this.props.activeTeamId,
              userId: this.props.activeUser._id,
              type: 'group',
            },
          });
        // console.log('group convos add group', groupConvos.data)
        this.setState({
          groupConvos: groupConvos.data,
          groupModal: false
        });
      });
  };

  toggleGroupModal = (event) => {
    event.preventDefault();
    this.setState({ groupModal: !this.state.groupModal });
  }

  // on addMember() click, prompt for invitee email address, and add the email to invitedEmails array on team (to be checked later on registration)
  addMember = e => {
    e.preventDefault();
    // console.log("add member button clicked")
    fc.service('teams').patch(this.props.activeTeamId, { $push: { invitedEmails: this.state.userEmail } });
    this.setState({ userModal: false });
  };

  emailChange = (event) => {
    this.setState({ userEmail: event.target.value });
  }

  toggleEmail = (event) => {
    event.preventDefault();
    this.setState({ userModal: !this.state.userModal });
  }

  // when a conversation is clicked, open it up in ConversationPage ?
  openConversation = e => {
    e.preventDefault();
    this.setState({ activeConvoId: e.currentTarget.id });
  };


  render() {
    return (
      <div className="row" id="team-page" >
        <div className="col-4 flex-column justify-content-center pt-5 pr-0 border-right">
          <TeamHeader teamName={this.state.teamName} activeUser={this.props.activeUser} teamChange={this.props.teamChange} />
          <GroupHeader addGroup={this.addGroup} value={this.state.groupName} modalStatus={this.state.groupModal} groupNameHandler={this.groupNameChange} toggleModal={this.toggleGroupModal} {...this.props} />
          {this.state.groupConvos.length > 0 ? (
            this.state.groupConvos.map(convo => <TeamListItem key={convo._id} activeUserId={this.props.activeUser._id}  openConversation={this.openConversation} {...convo} />
            )
          ) : (<h6 className='listItem'>No Group Conversations Exist</h6>)
          }
          <MemberHeader addMember={this.addMember} modalStatus={this.state.userModal} emailChange={this.emailChange} value={this.state.userEmail} {...this.props} toggleModal={this.toggleEmail} />
          {this.state.memberConvos.length > 0 ? (
            this.state.memberConvos.map(convo => (
              <TeamListItem key={convo._id}  activeUserId={this.props.activeUser._id}  openConversation={this.openConversation} {...convo} />
            ))
          ) : (
              <h3 className='listItem'>No Member Conversations Exist</h3>
            )}
          <CustomerHeader addMember={this.addMember} {...this.props} />
          {this.state.customerConvos.length > 0 ? (
            this.state.customerConvos.map(convo => <TeamListItem key={convo._id} activeUserId={this.props.activeUser._id} openConversation={this.openConversation} {...convo} />
            )
          ) : (<h6 className="listItem">No Customer Conversations Exist</h6>)
          }
        </div>
        <ConversationView getMessages={this.getMessages} messages={this.state.messages} activeUser={this.props.activeUser} conversationId={this.state.activeConvoId} />
      </div>
    );
  }
}

export default TeamPage;

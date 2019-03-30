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
    activeConversation: {},
    activeConvoId: '',
    groupName: "",
    groupModal: false,
    userEmail: "",
    userModal: false,
  };

  // When a conversation is opened change unread to unreplied. 
  unreadToUnreplied = async () => {
    const teamId = this.state.activeTeamId;
    const userId = this.props.activeUser._id;
    // update db 
    let statusPath = `status.${userId}`;
    console.log('status path check should be status.sdlfawoiecwpo', statusPath)
    console.log('activeConvo status',this.state.activeConversation.status)
    if (this.state.activeConversation.status[userId] === "unread") {
      const updatedConvo = await fc.service('conversations').patch(this.state.activeConvoId, { [statusPath] : "unreplied"})
    // update state with new convos from db 
    console.log('updatedconvo status', updatedConvo.status)
    const type = updatedConvo.type;
    if (type==="member") {const memberConvos = await this.getMemberConvos(teamId, this.props.activeUser); await this.setState({memberConvos})}
    else if (type==="group") {const groupConvos = await this.getGroupConvos(teamId, this.props.activeUser); console.log('group conversations', groupConvos); await this.setState({groupConvos})}
    else if (type==="incoming") {const customerConvos = await this.getCustomerConvos(teamId, this.props.activeUser); await this.setState({customerConvos})}
    }
  } // done
  getMemberConvos = async (teamId, user) => { 
    let memberConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "member"}});
    memberConvos = this.removeMyNameFromDisplayedMemberConvoName(memberConvos, user);
    return memberConvos.data;
  } // done
  getGroupConvos = async (teamId, user) => { 
    const groupConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "group"}});
    return groupConvos.data;
  } // done
  getCustomerConvos = async (teamId, user) => {
    const customerConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "incoming"}});
    return customerConvos.data;
  } // done
  getTeamMembers = async (teamId) => {
    const teamMembers = await fc.service('users').find({query: {teamIds: teamId}});
    return teamMembers.data;
  } // done
  getTeamName = async (teamId) => {
    const team = await fc.service('teams').get(teamId);
    return team.name;
  } // done
  removeMyNameFromDisplayedMemberConvoName = (memberConvos,user) => {
    for (let i=1; i<memberConvos.length; i++) {
      memberConvos[i].name = memberConvos[i].name.replace(user.name, "")
    }
    return memberConvos
  } // done
  createNewPersonalConversation_OnJoinTeam = async (teamId, user) => {
    const myConvo = await fc.service('conversations').create({teamId: teamId, type: "member", name: user.name + " (you)", userIds: user._id});
  } // done
  createNewMember2MemberConversations_OnJoinTeam = async (teamMembers, teamId, user) => {
    for (let i = 0; i < teamMembers.length; i++) {
      if (user._id !== teamMembers[i]._id) {
        const convo = await fc.service('conversations').create({
          name: user.name + ' ' + teamMembers[i].name,
          userIds: [user._id, teamMembers[i]._id],
          type: 'member',
          teamId: teamId
        });
      }
    }
  } // done
  addNewMemberToAllGroupConversations_OnJoinTeam = async (teamId, user) => {
    return await fc.service('conversations').patch(null, {$push: {userIds: user._id}}, {query: {teamId: teamId, type: "group"}});
  } // done
  initializeGroupConvoStatus_IfNeeded = async (groupConvos, user) => {
    for (let i = 0; i<groupConvos.length; i++) {
      if (!groupConvos[i].status) {
        groupConvos[i].status = {};
      }
      if (!groupConvos[i].status[user._id]) {
        groupConvos[i].status[user._id] = "replied"
        const groupConvo = await fc.service('conversations').patch(groupConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }
    return groupConvos;
  } // done
  intializeMemberConvoStatus_IfNeeded = async (memberConvos, user) => {
    for (let i = 0; i<memberConvos.length; i++) {
      if (!memberConvos[i].status) {
        memberConvos[i].status = {};
      }
      if (!memberConvos[i].status[user._id]) {
        memberConvos[i].status[user._id] = "replied"
        await fc.service('conversations').patch(memberConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }
    return memberConvos;
  } // done
  initializeCustomerConvoStatus_IfNeeded = async (customerConvos, user) => {
    for (let i = 0; i<customerConvos.length; i++) {
      if (!customerConvos[i].status) {
        customerConvos[i].status = {};
      }
      if (!customerConvos[i].status[user._id]) {
        customerConvos[i].status[user._id] = "replied"
        await fc.service('conversations').patch(customerConvos[i]._id, {status: {[user._id]: "replied" }})
      }
    }
    return customerConvos
  } // done


  getData = async (teamId, user) => {
    const teamName = await this.getTeamName(teamId);
    let teamMembers = await this.getTeamMembers(teamId);
    let groupConvos = await this.getGroupConvos(teamId, user);
    let memberConvos = await this.getMemberConvos(teamId, user);
    let customerConvos = await this.getCustomerConvos(teamId, user);

    // upon first login to a team: create the member to member threads between the new member and all other members
    if (memberConvos.length === 0) {
      await this.createNewPersonalConversation_OnJoinTeam(teamId, user);
      await this.createNewMember2MemberConversations_OnJoinTeam(teamMembers, teamId, user);
      memberConvos = await this.getMemberConvos(teamId, user._id);
    }
    if (groupConvos.length === 0) {
      groupConvos = await this.addNewMemberToAllGroupConversations_OnJoinTeam(teamId, user);
    }

    // if the status doesn't exist yet set the default status for activeUser on the convo to replied
    groupConvos = await this.initializeGroupConvoStatus_IfNeeded(groupConvos, user);
    memberConvos = await this.intializeMemberConvoStatus_IfNeeded(memberConvos, user);
    customerConvos = await this.initializeCustomerConvoStatus_IfNeeded(customerConvos, user);

    this.setState({
      teamMembers: teamMembers,
      teamName: teamName,
      groupConvos: groupConvos,
      memberConvos: memberConvos,
      customerConvos: customerConvos.data || []
    });
  } // done
  updateStateForNewMessage = async (message) => {
    // pull convos for this message type and update state
    const convo = await fc.service('conversations').get(message.conversationId);
    const convoType = convo.type;
    if (convoType === "member") { const updatedMemberConvos = await this.getMemberConvos(this.props.activeTeamId, this.props.activeUser); this.setState({memberConvos: updatedMemberConvos})}
    else if (convoType === "group") { const updatedGroupConvos = await this.getGroupConvos(this.props.activeTeamId, this.props.activeUser); this.setState({groupConvos: updatedGroupConvos})}
    else if ( convoType === "incoming") {const updatedCustomerConvos = await this.getCustomerConvos(this.props.activeTeamId, this.props.activeUser); this.setState({customerConvos: updatedCustomerConvos})}
    // if convo is current convo then get messages and update state
    if (this.state.activeConvoId === message.conversationId) {
      await this.setState({messages: [...this.state.messages, message]})
    }
  } // done
  updateStateForNewConvo = async convo => {
    const convoType = convo.type;
    if (convoType === "member") { const updatedMemberConvos = await this.getMemberConvos(this.props.activeTeamId, this.props.activeUser); this.setState({memberConvos: updatedMemberConvos})}
    else if (convoType === "group") { const updatedGroupConvos = await this.getGroupConvos(this.props.activeTeamId, this.props.activeUser); this.setState({groupConvos: updatedGroupConvos})}
    else if ( convoType === "incoming") { const updatedCustomerConvos = await this.getCustomerConvos(this.props.activeTeamId, this.props.activeUser); this.setState({customerConvos: updatedCustomerConvos})}
  } // done

  updateMessagesForActiveConversation = async () => {
    const messages = await fc.service("messages").find({ query: { conversationId: this.state.activeConvoId } })
    await this.setState({ messages: messages.data });
  }; // done
  

  componentDidMount() {
    this.getData(this.props.activeTeamId, this.props.activeUser);

    // Listen to created conversation and add the new convo in real-time
    fc.service('conversations').on('created', this.updateStateForNewConvo);
    // listen for new messages, then run updateStateForNewMessages
    fc.service('messages').on('created', this.updateStateForNewMessage);
  } // done

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.activeUser !== this.props.activeUser ||
      prevProps.activeTeamId !== this.props.activeTeamId ||
      prevState.teamMembers.length !== this.state.teamMembers.length
    ) {
      this.getData(this.props.activeTeamId, this.props.activeUser);
    }
    // if activeConvoId changes then run get messages to update state
    if (this.state.activeConvoId !== prevState.activeConvoId) {
      this.updateMessagesForActiveConversation();
      this.unreadToUnreplied();
    }
  }

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
        status: {[this.props.activeUser._id]: "replied" },
        userIds: this.state.teamMembers.map(member => member._id)
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
          groupModal: false,
          groupName: ""
        });
      });
  }

  toggleGroupModal = (event) => {
    event.preventDefault();
    this.setState({ groupModal: !this.state.groupModal });
  }
  // on addMember() click, prompt for invitee email address, and add the email to invitedEmails array on team (to be checked later on registration)
  addMember = e => {
    e.preventDefault();
    // console.log("add member button clicked")
    fc.service("users").find({query: {email: this.state.userEmail}})
      .then(user => {
        if(user.data[0] && user.data[0].email === this.state.userEmail){
          console.log("user was found");
          fc.service("users").patch(user.data[0]._id, {$push: {teamIds: this.props.activeTeamId}})
            .then(user => {
              this.getData(this.props.activeTeamId, user);
            });
        } else {
          console.log("user was not found");
          fc.service('teams').patch(this.props.activeTeamId, { $push: { invitedEmails: this.state.userEmail } });
        }
      });
    this.setState({userModal: false});
  };

  emailChange = (event) => {
    this.setState({ userEmail: event.target.value });
  }

  toggleEmail = (event) => {
    event.preventDefault();
    this.setState({ userModal: !this.state.userModal });
  }

  // when a conversation is clicked, open it up in ConversationPage ?
  openConversation = async e => {
    e.preventDefault();
    const convoId = e.currentTarget.id;
    const convo = await fc.service('conversations').get(convoId)
    this.setState({ activeConvoId: convoId, activeConversation: convo });
  }


  render() {
    return (
      <div className="row" id="team-page">
        <div className="col-4 flex-column justify-content-center border-right convoView">
        <TeamHeader teamName={this.state.teamName} activeUser={this.props.activeUser} teamChange={this.props.teamChange}/>
            <div>
            <GroupHeader addGroup={this.addGroup} value={this.state.groupName} modalStatus={this.state.groupModal} groupNameHandler={this.groupNameChange} toggleModal={this.toggleGroupModal} {...this.props} />
            {this.state.groupConvos.length > 0 ? (
                this.state.groupConvos.map(convo => <TeamListItem key={convo._id} openConversation={this.openConversation} {...convo} />
                )
              ) : ( <h6 className='listItem'>No Group Conversations Exist</h6>)
            }
            <MemberHeader addMember={this.addMember} modalStatus={this.state.userModal} emailChange={this.emailChange} value={this.state.userEmail} {...this.props} toggleModal={this.toggleEmail} />
            {this.state.memberConvos.length > 0 ? (
              this.state.memberConvos.map(convo => (
                <TeamListItem key={convo._id} openConversation={this.openConversation} {...convo} />
              ))
            ) : (
              <h3 className='listItem'>No Member Conversations Exist</h3>
            )}
          <CustomerHeader addMember={this.addMember} {...this.props} />
          {this.state.customerConvos.length > 0 ? (
            this.state.customerConvos.map(convo => <TeamListItem key={convo._id} activeUserId={this.props.activeUser._id} openConversation={this.openConversation} status={convo.status} {...convo} />
            )
          ) : (<h6 className="listItem">No Customer Conversations Exist</h6>)
          }
            </div>
        </div>
        <ConversationView getMessages={this.updateMessagesForActiveConversation} messages={this.state.messages} activeUser={this.props.activeUser} conversationId={this.state.activeConvoId} conversation={this.state.activeConversation} />
      </div>
    );
  }
}

export default TeamPage;

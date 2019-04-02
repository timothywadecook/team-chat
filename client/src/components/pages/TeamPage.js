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
    teamSMS: "",
    groupConvos: [],
    memberConvos: [],
    customerConvos: [],
    messageView: false,
    activeConversation: null,
    activeConvoId: '',
    groupName: "",
    groupModal: false,
    userEmail: "",
    userModal: false,
    connectSMSModal: false
  };

  // When a conversation is opened change unread to unreplied. 
  unreadToUnreplied = async () => {
    const teamId = this.props.activeTeamId;
    const userId = this.props.activeUser._id;
    // update db 
    let statusPath = `status.${userId}`;
    if (this.state.activeConversation.status[userId] === "unread") {
      const updatedConvo = await fc.service('conversations').patch(this.state.activeConvoId, { [statusPath] : "unreplied"})
      // update state with new convos from db 
      const type = updatedConvo.type;
      if (type==="member") {const memberConvos = await this.getMemberConvos(teamId, this.props.activeUser); await this.setState({memberConvos})}
      else if (type==="group") {const groupConvos = await this.getGroupConvos(teamId, this.props.activeUser); await this.setState({groupConvos})}
      else if (type==="incoming") {const customerConvos = await this.getCustomerConvos(teamId, this.props.activeUser); await this.setState({customerConvos})}
    }
  } // done
  getMemberConvos = async (teamId, user) => { 
    let memberConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "member"}});
    if (memberConvos.data.length > 0) {memberConvos = await this.removeMyNameFromDisplayedMemberConvoName(memberConvos.data, user);} else {memberConvos = memberConvos.data}
    return memberConvos;
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
  getTeam = async (teamId) => {
    const team = await fc.service('teams').get(teamId);
    return team;
  } // done
  removeMyNameFromDisplayedMemberConvoName = (memberConvos,user) => {
    for (let i=1; i<memberConvos.length; i++) {
      memberConvos[i].name = memberConvos[i].name.replace(user.name, "").trim()
    }
    return memberConvos
  } // done
  createNewPersonalConversation_OnJoinTeam = async (teamId, user) => {
    const myConvo = await fc.service('conversations').create({teamId: teamId, type: "member", name: user.name + " (you)", userIds: user._id, status: {[user._id]: "replied"}});
  } // done
  createNewMember2MemberConversations_OnJoinTeam = async (teamMembers, teamId, user) => {
    for (let i = 0; i < teamMembers.length; i++) {
      if (user._id !== teamMembers[i]._id) {
        const convo = await fc.service('conversations').create({
          name: user.name + ' ' + teamMembers[i].name,
          userIds: [user._id, teamMembers[i]._id],
          type: 'member',
          teamId: teamId,
          status: {[user._id]: "replied"}
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
    const team = await this.getTeam(teamId);
    const teamName = team.name;
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
      teamSMS: team.smsNumber || "",
      groupConvos: groupConvos,
      memberConvos: memberConvos,
      customerConvos: customerConvos || []
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
      // this.setState({messages: [...this.state.messages, message]})
      this.updateMessagesForActiveConversation();
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
    if (prevProps.activeTeamId !== this.props.activeTeamId) {
      this.setState({activeConvoId: "", activeConversation: null, messages: []})
    }
    // if activeConvoId changes then run get messages to update state
    if (this.state.activeConvoId && this.state.activeConvoId !== prevState.activeConvoId) {
      // get the messages for the now active conversation
      this.updateMessagesForActiveConversation();
      // change the status of this active conversation to unreplied if unread
      this.unreadToUnreplied();
    }
  }

  groupNameChange = (event) => {
    this.setState({ groupName: event.target.value });
  }

  addGroup = async (e) => {
    e.preventDefault();
    const userIds = this.state.teamMembers.map(member => member._id);
    await fc.service('conversations').create({
        name: this.state.groupName,
        type: 'group',
        teamId: this.props.activeTeamId,
        status: {[this.props.activeUser._id]: "replied" },
        userIds: userIds
      });
    // const updatedGroupConversations = await this.getGroupConvos(this.props.activeTeamId, this.props.activeUser);

    this.setState({
      // groupConvos: updatedGroupConversations,
      groupModal: false,
      groupName: ""
    })
  }

  toggleConnectSMSModal = () => {
    // e.preventDefault();
    this.setState({connectSMSModal: !this.state.connectSMSModal})
  };

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
              this.getData(this.props.activeTeamId, this.props.activeUser);
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
                this.state.groupConvos.map(convo => <TeamListItem key={convo._id} activeConvoId={this.state.activeConvoId} activeUserId={this.props.activeUser._id} openConversation={this.openConversation} {...convo} />
                )
              ) : ( <h6 className='listItem'>{null}</h6>)
            }
            <MemberHeader addMember={this.addMember} modalStatus={this.state.userModal} emailChange={this.emailChange} value={this.state.userEmail} {...this.props} toggleModal={this.toggleEmail} />
            {this.state.memberConvos.length > 0 ? (
              this.state.memberConvos.map(convo => (
                <TeamListItem key={convo._id} activeConvoId={this.state.activeConvoId} activeUserId={this.props.activeUser._id} openConversation={this.openConversation} {...convo} />
              ))
            ) : (
              <h3 className='listItem'>{null}</h3>
            )}
          <CustomerHeader teamSMS={this.state.teamSMS} activeTeamId={this.props.activeTeamId}  modalState={this.state.connectSMSModal} toggle={this.toggleConnectSMSModal} {...this.props} />
          {this.state.customerConvos.length > 0 ? (
            this.state.customerConvos.map(convo => <TeamListItem key={convo._id} activeConvoId={this.state.activeConvoId}  activeUserId={this.props.activeUser._id} openConversation={this.openConversation} status={convo.status} {...convo} />
            )
          ) : (<h6 className="listItem">{null}</h6>)
          }
            </div>
        </div>
        <ConversationView getMessages={this.updateMessagesForActiveConversation} messages={this.state.messages} activeUser={this.props.activeUser} conversationId={this.state.activeConvoId} conversation={this.state.activeConversation} />
      </div>
    );
  }
}

export default TeamPage;

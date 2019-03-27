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
    teamMembers: [],
    teamName: '',
    groupConvos: [],
    memberConvos: [],
    customerConvos: [],
    messageView: false,
    activeConvo: '',
    groupName: "",
    groupModal: false,
    userEmail: "",
    userModal: false
  };

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
    // for(let i = 1; i < memberConvos.length; i++){
    //   memberConvos[i].name = memberConvos[i].name.replace(this.props.activeUser.name, "");
    // }
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
            teamId: teamId,
          });
          memberConvos.push(convo);
        }
      }
    }
    for(let i = 1; i < memberConvos.length; i++){
      memberConvos[i].name = memberConvos[i].name.replace(this.props.activeUser.name, "");
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

    this.setState({
      teamMembers: teamMembers,
      teamName: teamName,
      groupConvos: groupConvos,
      memberConvos: memberConvos,
    });
  };

  componentDidMount() {
    const user = this.props.activeUser;
    const teamId = this.props.activeTeamId;
    this.getData(teamId, user);

    // Listen to created conversation and add the new convo in real-time
    fc.service('conversations').on('created', this.addConversation);
    fc.service('teams').on('created', (data) => {
      console.log('new team was created' ,data)
    })
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
  }

  /**
   * Add a message to state
   */
  addConversation = convo => {
    console.log(convo);
    convo.name = convo.name.replace(this.props.activeUser.name, "");
    console.log(convo)
    if (convo.type === 'group') {
      this.setState({ groupConvos: this.state.groupConvos.concat([convo]) });
    } else if (convo.type === 'member' && convo.userIds.includes(this.props.activeUser._id)) {
      console.log("dm was added");
      this.setState({ memberConvos: this.state.memberConvos.concat([convo]) });
    }
  };

  groupNameChange = (event) => {
    this.setState({groupName: event.target.value});
  }

  addGroup = (e) => {
    e.preventDefault();
    fc.service('conversations')
      .create({
        name: this.state.groupName,
        type: 'group',
        teamId: this.props.activeTeamId,
        userIds: this.state.teamMembers,
      })
      .then(async newGroup => {
        // console.log('this.props', this.props.activeUser.name);
        const groupConvos = await fc
          .service('conversations')
          .find({
            query: {
              teamId: this.props.activeTeamId,
              userId: this.props.activeUser.id,
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
    this.setState({groupModal: !this.state.groupModal});
  }

  // on addMember() click, prompt for invitee email address, and add the email to invitedEmails array on team (to be checked later on registration)
  addMember = e => {
    e.preventDefault();
    // console.log("add member button clicked")
    fc.service("users").find({query: {email: this.state.userEmail}})
      .then(user => {
        if(user.data[0] && user.data[0].email === this.state.userEmail){
          console.log("user was found");
          fc.service("users").patch(user.data[0]._id, {$push: {teamIds: this.props.activeTeamId}}).then(user => console.log(user));
        } else {
          console.log("user was not found");
          fc.service('teams').patch(this.props.activeTeamId, { $push: { invitedEmails: this.state.userEmail } });
        }
      });
    this.setState({userModal: false});
  };

  emailChange =(event) => {
    this.setState({userEmail: event.target.value});
  }

  toggleEmail = (event) => {
    event.preventDefault();
    this.setState({userModal: !this.state.userModal});
  }

  // when a conversation is clicked, open it up in ConversationPage ?
  openConversation = e => {
    e.preventDefault();
    this.setState({ activeConvo: e.currentTarget.id });
  };
  
  render() {
    return (
      <div className="row" id="team-page">
        <div className="col-4 flex-column justify-content-center pt-5 pr-0 border-right">
        <TeamHeader teamName={this.state.teamName} activeUser={this.props.activeUser} teamChange={this.props.teamChange}/>
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
              this.state.customerConvos.map(convo => <TeamListItem key={convo._id} openConversation={this.openConversation} {...convo} />
                ) 
            ) : (<h6 className="listItem">No Customer Conversations Exist</h6>)
          }
        </div>
        <ConversationView activeUser={this.props.activeUser} conversationId={this.state.activeConvo}/>
      </div>
    );
  }
}

export default TeamPage;

import React from "react";
// import { MDBContainer, MDBRow, MDBCol, EdgeHeader } from "mdbreact";
// import { fchmod } from "fs";
import { fc } from '../../feathersClient';

// addGroup() onClick should cause the Add Group modal to pop up
// addMember() onClick should case the Add Member modal to pop up
// styling classes defined: stickyHeader
const GroupsStickyHeader = (props) => {
  return (
    <div className="header">
        <h3 className="stickyHeader">Groups</h3>
        <button onClick={props.addGroup} className="addBtn"><i className="material-icons" style={{fontSize:"20px", color:"grey"}} >add_circle_outline</i> </button>
    </div>
  )
}
const MembersStickyHeader = (props) => {
  return (
    <div className="header">
      <h3 className="stickyHeader">Members</h3>
      <button onClick={props.addMember}  className="addBtn" ><i className="material-icons" style={{fontSize:"20px", color:"grey"}} >add_circle_outline</i> </button>
    </div>
  )
}

// assume props includes {status, name convoId, preview, elapsedTime, openConversation()}
// status = [read, unreplied, replied]
// styling classes defined: listItem, [read, unreplied, replied], listName, previewText, elapsedTime
const TeamListItem = props => {
  return (
    <div className="listItem" id={props._id} onClick={props.openConversation}>
      <i className="material-icons notifyDot" style={{fontSize:"20px", color:"blue"}}>fiber_manual_record</i>
      <h2 className="listName">{props.name}</h2>
      <div className="previewText">{props.preview}</div>
      <div className="elapsedTime">{props.timestamps}</div>
  </div>
  )
}


  // this.props =  activeTeamId, activeUser,  teamCreate, teamNameInput, teamName, {...props}
class TeamPage extends React.Component {
    state={
      teamMembers: [],
      teamName: "",
      groupConvos: [],
      memberConvos: []
    }

    getData = async (teamId, user) => {
      const team = await fc.service('teams').get({ _id: teamId })
      const teamName = team.name;
      let teamMembers = await fc.service('users').find({query: {teamIds: teamId}})
      let groupConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "group"}})  
      let memberConvos = await fc.service('conversations').find({query: {teamId: teamId, userIds: user._id, type: "member"}})
      memberConvos = memberConvos.data;
      groupConvos = groupConvos.data;
      teamMembers = teamMembers.data;
      // create the member to member threads between the new member and all other members
      if (memberConvos.length === 0) {
        for (let i=0; i<teamMembers.length; i++) {
          if (user._id !== teamMembers[i]._id) {
            const convo = await fc.service('conversations').create({
              name: user.name + ' ' + teamMembers[i].name,
              userIds: [user._id, teamMembers[i]._id],
              type: "member",
              teamId: teamId
            })
            memberConvos.push(convo)
          }
        }
        // create the "(you)" thread for a user upon first login on new team
        const myConvo = await fc.service('conversations').create({teamId:teamId, type: "member", name: user.name + " (you)", userIds: user._id}) 
        console.log('myconvo ', myConvo)
        memberConvos.unshift(myConvo)
      };
      if (groupConvos.length === 0) {groupConvos = await fc.service('conversations').patch(null, {$push: {userIds: user._id}}, {query: {teamId: teamId, type: "group"}})}
      console.log(memberConvos, groupConvos)
      this.setState({
        teamMembers: teamMembers,
        teamName: teamName,
        groupConvos: groupConvos,
        memberConvos: memberConvos
      })
    }

    componentDidMount() {
      const user = this.props.activeUser;
      const teamId = this.props.activeTeamId;
      this.getData(teamId, user);
      // Listen to created conversation and add the new convo in real-time
      fc.service('conversations').on('created', this.addConversation);
    }

    componentDidUpdate(prevProps) {
      const user = this.props.activeUser;
      const teamId = this.props.activeTeamId;
      if (prevProps.activeUser !== this.props.activeUser || prevProps.activeTeamId !== this.props.activeTeamId) {
        this.getData(teamId, user)
      }
    }

    /**
     * Add a message to state
     */
    addConversation = (convo) => {
      if(convo.type === 'group') {
        this.setState({ groupConvos: this.state.groupConvos.concat( [convo])})
      } else if (convo.type === 'member' && convo.userIds.includes(this.props.activeUser._id)) {
        this.setState({ memberConvos: this.state.memberConvos.concat( [convo])})
      }
    }

    addGroup = (e) => {
      e.preventDefault();
      const name = prompt('Enter group name')
      fc.service('conversations').create({
        name: name,
        type: "group",
        teamId: this.props.activeTeamId,
        userIds: this.state.teamMembers
      })
      .then(async newGroup => {
        // console.log('this.props', this.props.activeUser.name);
        const groupConvos = await fc.service('conversations').find({query: {teamId: this.props.activeTeamId, userId: this.props.activeUser.id, type: "group"}});
        // console.log('group convos add group', groupConvos.data)
        this.setState({
          groupConvos: groupConvos.data
        })
      })
    }

    // on addMember() click, prompt for invitee email address, and add the email to invitedEmails array on team (to be checked later on registration)
    addMember = (e) => {
      e.preventDefault();
      // console.log("add member button clicked")
      const email = prompt('Enter email of invitee')
      fc.service('teams').patch(this.props.activeTeamId, {$push: {invitedEmails: email}})
    }

    // when a conversation is clicked, open it up in ConversationPage ?
    openConversation = (e) => {
      e.preventDefault();
      // console.log("a conversation was clicked")
    }

    render() {
      return (
        <div>
          <h1 className="header">{this.state.teamName}</h1>
          <GroupsStickyHeader addGroup={this.addGroup} {...this.props} />
          {this.state.groupConvos.length > 0 ? this.state.groupConvos.map(convo => (
            <TeamListItem key={convo._id} openConversation={this.openConversation} {...convo} />
          )) : <h3 className="listItem">No Group Conversations Exist</h3>}
          <MembersStickyHeader addMember={this.addMember} {...this.props} />
          {this.state.memberConvos.length > 0 ? this.state.memberConvos.map(convo => (
            <TeamListItem key={convo._id} openConversation={this.openConversation} {...convo} />
          )) : <h3 className="listItem">No Member Conversations Exist</h3> }
        </div>
      )
    }
}


// const TeamPage = () => {
//   return (
//     <MDBContainer>
//       <MDBRow>
//         <MDBCol md="4">Conversations
//             <MDBRow>
//             <MDBCol md="4">Groups</MDBCol>
//             </MDBRow>
//             <MDBRow>
//             <MDBCol md="4">Members</MDBCol>
//             </MDBRow>
//         </MDBCol>
//         <MDBCol md="8">Messages</MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

export default TeamPage

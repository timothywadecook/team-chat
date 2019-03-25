import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { fchmod } from "fs";
import { fc } from './feathersClient';

// addGroup() onClick should cause the Add Group modal to pop up 
// addMember() onClick should case the Add Member modal to pop up
// styling classes defined: stickyHeader 
const GroupsStickyHeader = (props) => {
  return 
  <div>
      <h3 className="stickyHeader">Groups</h3>
      <button onClick={props.addGroup}> <i className="material-icons" style="font-size:12px;color:grey;">add_circle_outline</i> </button>
  </div>
}
const MembersStickyHeader = (props) => {
  return 
  <div>
      <h3 className="stickyHeader">Members</h3>
      <button onClick={props.addMember}> <i className="material-icons" style="font-size:12px;color:grey;">add_circle_outline</i> </button>
  </div>
}

// assume props includes {status, name convoId, preview, elapsedTime, openConversation()}
// status = [read, unreplied, replied]
// styling classes defined: listItem, [read, unreplied, replied], listName, previewText, elapsedTime
const TeamListItem = props => {
  return
  <div className={listItem} id={props.convoId} onClick={props.openConversation}>
      <i className={"material-icons " + props.status} style="font-size:12px;">fiber_manual_record</i>
      <h2 className={listName}>{props.name}</h2>
      <div className={previewText}>{props.preview}</div>
      <div className={elapsedTime}>{props.elapsedTime}</div>
  </div>

}

  // get groupList (note: changes to db or state should trigger re-render)
  // get memberList (changes to db or state should trigger re-render)
  // props =  activeTeamId, activeUser,  teamCreate, teamNameInput, teamName, {...props} 
const TeamPage = (props) => {
    const teamName = "";

    const getData = async () => {
      const team = await fc.service('teams').get({ _id: props.activeTeamId })
      teamName = team.name;
      const conversations = await fc.service('conversations').get({_id: { $in: team.conversationIds}})
    }
    addGroup = () => {

    }
    addMember = () => {
      
    }

    getData()
      return 
    <div>
      <h1>{teamName}</h1>
      <GroupsStickyHeader addGroup={addGroup} {...props} />
      <MembersStickyHeader addMember={addMember} {...props} />
    </div>
}


const TeamPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="4">Conversations
            <MDBRow>
            <MDBCol md="4">Groups</MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol md="4">Members</MDBCol>
            </MDBRow>
        </MDBCol>
        <MDBCol md="8">Messages</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default TeamPage
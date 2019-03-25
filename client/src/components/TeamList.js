import React, { Component } from 'react';


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


// TeamList will render the team list comprised of:
//      <GroupsStickyHeader />
//      list of groups mapped over <TeamListItem />
//      <MembersStickyHeader />
//      list of members mapped over <TeamListItem />

class TeamList extends React.Component {



    // get groupList (note: changes to db or state should trigger re-render)
    // get memberList (changes to db or state should trigger re-render)

    render() {
        return
    <div>
        <GroupsStickyHeader {...props} />
        <MembersStickyHeader {...props} />
    </div>
    }

}
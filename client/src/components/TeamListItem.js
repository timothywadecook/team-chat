import React from 'react';


// props.status[props.activeUserId]  {props.status[props.activeUserId] + 
const TeamListItem = props => {
  return (
    <div className="border border-right-0" id={props._id} onClick={props.openConversation}>
      <i className= {props.status[props.activeUserId] +' material-icons notifyDot'} style={{ fontSize: '20px' }}>
        fiber_manual_record
      </i>
      <h5 className='listName'>{props.name}</h5>
      <div className='previewText'>{props.preview}</div>
      <div className='elapsedTime'>{props.timestamps}</div>
    </div>
  );
};

export default TeamListItem;

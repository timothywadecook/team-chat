import React from 'react';


// props.status[props.activeUserId]  {props.status[props.activeUserId] + 
const TeamListItem = props => {
  const status = props.status[props.activeUserId];
  return (
    props.activeConvoId === props._id
    ? <div className="border teamListItem activeConvo fade-in" id={props._id} onClick={props.openConversation}>
      <i className={'material-icons notifyDot '+ status} style={{ fontSize: '20px' }}>
        fiber_manual_record
      </i>
      <h5 className='listName'>{props.name}</h5>
      <div className='previewText text-muted'>{props.preview}</div>
      <div className='elapsedTime'>{props.timestamps}</div>
    </div> : 
    <div className="border teamListItem slide-in-bck-center" id={props._id} onClick={props.openConversation}>
      <i className={'material-icons notifyDot ' + status} style={{ fontSize: '20px' }}>
        fiber_manual_record
      </i>
      <h5 className='listName'>{props.name}</h5>
      <div className='previewText text-muted'>{props.preview}</div>
      <div className='elapsedTime'>{props.timestamps}</div>
    </div>
  );
  
};

export default TeamListItem;

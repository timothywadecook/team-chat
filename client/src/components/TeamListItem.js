import React from 'react';

const TeamListItem = props => {
  return (
    props.activeConvoId === props._id
    ? <div className="border teamListItem activeConvo fade-in" id={props._id} onClick={props.openConversation}>
      <i className='material-icons notifyDot' style={{ fontSize: '20px', color: '#17ffb3' }}>
        fiber_manual_record
      </i>
      <h5 className='listName'>{props.name}</h5>
      <div className='previewText text-muted'>{props.preview}</div>
      <div className='elapsedTime'>{props.timestamps}</div>
    </div> : 
    <div className="border teamListItem slide-in-bck-center" id={props._id} onClick={props.openConversation}>
      <i className='material-icons notifyDot' style={{ fontSize: '20px', color: '#17ffb3' }}>
        fiber_manual_record
      </i>
      <h5 className='listName'>{props.name}</h5>
      <div className='previewText text-muted'>{props.preview}</div>
      <div className='elapsedTime'>{props.timestamps}</div>
    </div>
  );
};

export default TeamListItem;

import React from 'react';

const GroupHeader = props => {
  return (
    <div className="px-2 d-flex justify-content-between align-items-center">
      <h6 className="text-muted">Groups</h6>
      <button onClick={props.addGroup} className='addBtn'>
        <i className='material-icons' style={{ fontSize: '20px', color: 'grey' }}>
          add_circle_outline
        </i>
      </button>
    </div>
  );
};

export default GroupHeader;

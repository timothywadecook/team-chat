import React from 'react';

function MemberHeader(props)  {
  return (
    <div className="px-2 d-flex justify-content-between align-items-center">
      <h6 className='text-muted'>Members</h6>
      <button onClick={props.addMember} className='addBtn'>
        <i className='material-icons' style={{ fontSize: '20px', color: 'grey' }}>
          add_circle_outline
        </i>
      </button>
    </div>
  );
};

export default MemberHeader;

import React from 'react';
import ConnectSMSModal from '../modals/ConnectSMSModal';

const CustomerHeader = props => {
    return (
      <div>
        <div className="px-2 d-flex justify-content-between align-items-center">
          <h6 className="text-muted">{props.teamSMS.length < 10 ? 'Customers' : props.teamSMS }</h6>
          <button onClick={props.toggle} className='addBtn'>
            <i className='material-icons' style={{ fontSize: '20px', color: 'grey' }}>
              add_circle_outline
            </i>
          </button>
        </div>
        <ConnectSMSModal activeTeamId={props.activeTeamId} activeUser={props.activeUser} modalState={props.modalState} toggle={props.toggle}/>
      </div>

    );
  };

export default CustomerHeader;
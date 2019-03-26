import React from "react";
import InviteUserModal from "../modals/InviteUserModal";

function MemberHeader(props) {
  return (
    <div>
      <div className="px-2 d-flex justify-content-between align-items-center">
        <h6 className="text-muted">Members</h6>
        <button onClick={props.toggleModal} className="addBtn">
          <i className="material-icons" style={{ fontSize: "20px", color: "grey" }}>
            add_circle_outline
          </i>
        </button>
      </div>
      <InviteUserModal toggle={props.toggleModal} {...props} />
    </div>
  );
}

export default MemberHeader;

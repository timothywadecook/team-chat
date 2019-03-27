import React from "react";
import CreateGroupModal from "../modals/CreateGroupModal";

class GroupHeader extends React.Component {
  render() {
    return (
      <div>
        <div className="px-2 d-flex justify-content-between align-items-center">
          <h6 className="text-muted">Groups</h6>
          <button onClick={this.props.toggleModal} className="addBtn">
            <i className="material-icons" style={{ fontSize: "20px", color: "grey" }}> add_circle_outline </i>
          </button>
        </div>
        <CreateGroupModal toggle={this.props.toggleModal} {...this.props} />
      </div>
    );
  }
}

export default GroupHeader;

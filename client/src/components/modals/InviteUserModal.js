import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup
} from "reactstrap";

class InviteUserModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalStatus}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Invite a New User</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input placeholder="Enter their email address" value={this.props.userEmail} onChange={this.props.emailChange}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.addMember}>
                Invite User
            </Button>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InviteUserModal;

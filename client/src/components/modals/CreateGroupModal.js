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

const CreateGroupModal = props => (
  <div>
    <Modal
      isOpen={props.modalStatus}
      toggle={props.toggle}
      className={props.className}
    >
      <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
      <ModalBody>
        <InputGroup>
          <Input
            placeholder="Enter New Group Name"
            value={props.value}
            onChange={props.groupNameHandler}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.addGroup}>
          Create Group
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  </div>
);

export default CreateGroupModal;

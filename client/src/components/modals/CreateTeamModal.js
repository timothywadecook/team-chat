import React from "react";
import { fc } from "../../feathersClient";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup
} from "reactstrap";

class CreateTeamModal extends React.Component {
  state = {
    teamName: ""
  };

  changeHandler =(event) => {
    this.setState({teamName: event.target.value});
  }

  createTeam = (e) => {
    fc.service('teams').create({ // create the team given the input name
        name: this.state.teamName,
    })
    .then((response) => {
        this.setState({teamName: ""});
        this.props.toggle();
    })
}

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalState}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Create a New Team</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input placeholder="Enter New Team Name" value={this.state.teamName} onChange={this.changeHandler}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.createTeam}>
                Create Team
            </Button>
            <Button color="cancelBtn" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateTeamModal;

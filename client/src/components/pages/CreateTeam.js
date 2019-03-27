import React, { Component } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup
} from "reactstrap";

class CreateTeam extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Container>
        <h1>
          Please feel free to create a team or wait until someone else adds you
          to their team!
        </h1>
        <Button color="info" onClick={this.toggle}>
          Create Team
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Please Enter a Team Name
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                value={this.props.teamName}
                onChange={this.props.teamNameInput}
                name="teamInput"
                type="text"
                label="Team Name"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.teamCreate}>
              Create Team
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default CreateTeam;

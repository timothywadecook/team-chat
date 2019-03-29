import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  Button
} from "reactstrap";
import { fc } from '../../feathersClient';

class CreateTeam extends Component {
  state = {
    modal: false,
    user: fc.get('user')
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="vw-100 vh-100 flex-center flex-column">
        <div className="jumbotron w-50 text-center">
        <h1 className="display-4">Welcome <span role="img" aria-label="welcome">&#x1f44b;</span></h1>
        <h4 className="">
          Please feel free to create a team or wait until someone else adds you to their team!
        </h4>
        <hr />
        <Button className="teamCreateBtn" onClick={this.toggle}>
          Create Team
        </Button>
        </div>
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
                placeholder="Team name"
                className="firstCreateTeamInput"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="teamCreateBtn" onClick={this.props.teamCreate}>
              Create Team
            </Button>
            <Button className="cancelBtn" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateTeam;

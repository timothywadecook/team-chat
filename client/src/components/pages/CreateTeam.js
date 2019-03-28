import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup
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
        <button className="btn btn-lg btn-info" onClick={this.toggle}>
          Create Team
        </button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Please Enter a Team Name
          </ModalHeader>
          <ModalBody>
            <InputGroup>
              <input
                value={this.props.teamName}
                onChange={this.props.teamNameInput}
                name="teamInput"
                type="text"
                placeholder="Team name"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.props.teamCreate}>
              Create Team
            </button>
            <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateTeam;

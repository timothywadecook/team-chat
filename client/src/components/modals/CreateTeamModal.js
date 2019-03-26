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
    fc.service('teams').create({ // create the team given the input name and set the active user as owner
        name: this.state.teamName,
        ownerId: this.props.activeUser._id
    })
    .then((data) => {
        fc.service("users").patch(this.props.activeUser._id, {$push: { // add new team to this User and set activeTeam in db
          teamIds: data._id
        }}).then(() => { // create default General converation
          fc.service("conversations").create(
            {
              teamId: data._id,
              type: "group",
              name: "General",
              userIds: this.props.activeUser._id
            },
          )
          fc.service("conversations").create(
            {
              teamId: data._id,
              type: "member",
              name: `${this.props.activeUser.name} (you)`,
              userIds: this.props.activeUser._id
            }
          )
        })
        .then((response) => {
          console.log(data);
            this.props.toggle();
        })
    });
}

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalState}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input placeholder="Enter New Team Name" value={this.state.teamName} onChange={this.changeHandler}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createTeam}>
                Create Team
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

export default CreateTeamModal;

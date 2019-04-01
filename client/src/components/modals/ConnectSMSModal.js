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

class ConnectSMSModal extends React.Component {
  state = {
    smsNumber: ""
  };

  changeHandler =(event) => {
    this.setState({smsNumber: event.target.value});
  }

  connectSMS = (e) => {
    e.preventDefault();
    fc.service('teams').patch(this.props.activeTeamId, { // assign this sms number as the team's smsNumber 
        smsNumber: this.state.smsNumber,
    })
    .then((response) => {
        this.setState({smsNumber: ""});
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
          <ModalHeader toggle={this.props.toggle}>Connect Customer SMS</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input placeholder="Enter your FrontDor SMS number. Format: +17708480092" value={this.state.smsNumber} onChange={this.changeHandler}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.connectSMS}>
                Connect
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

export default ConnectSMSModal;
import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

class CreateTeam extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <MDBContainer>
                <h1>Your email address has not been invited to any teams. Wait to be invited and check back, or feel free to create a new team below.</h1>
                <MDBBtn onClick={this.toggle}>Create Team</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Please Enter a Team Name</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            value = {this.props.teamName}
                            onChange={this.props.teamNameInput}
                            name="teamInput"
                            type="textarea"
                            label="Team Name"
                            rows="1"
                            icon="user-friends"
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.props.teamCreate}>Create Team</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default CreateTeam;

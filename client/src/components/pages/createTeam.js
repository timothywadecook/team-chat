import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { fc } from '../../feathersClient';

class CreateTeam extends Component {
    state = {
        modal: false,
        teamInput: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
          error: null
        })
      }
    
    handleClick = (e) => {
        fc.service('teams').create({
            name: this.state.teamInput,
            ownerId: this.props.activeUserId
        })
        .then((data) => {
            console.log(data);
        })
    }

    render() {
        return (
            <MDBContainer>
                <h1>Please feel free to create a team or wait until someone else adds you to their team!</h1>
                <MDBBtn onClick={this.toggle}>Create Team</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Please Enter a Team Name</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            value = {this.state.teamInput}
                            onChange={this.handleInput}
                            name="teamInput"
                            type="textarea"
                            label="Team Name"
                            rows="1"
                            icon="user-friends"
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.handleClick}>Create Team</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default CreateTeam;
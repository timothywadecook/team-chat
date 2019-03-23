import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const TeamPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="4">Conversations
            <MDBRow>
            <MDBCol md="4">Groups</MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol md="4">Members</MDBCol>
            </MDBRow>
        </MDBCol>
        <MDBCol md="8">Messages</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default TeamPage
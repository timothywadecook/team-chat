import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import logo from "./teamchatIcon.png";

function Index() {
  return (
    <Jumbotron className="landingPageDiv">
        <h2 className="landingPageHeader">Team Chat</h2>
        <img src={ logo } alt="Logo Placeholder" className="logoImage"/>
        <Link to="/login" className="authLink">
          Login
        </Link>
        <Link to="/register" className="authLink">
          Register
        </Link>
    </Jumbotron>
  );
}

export default Index;

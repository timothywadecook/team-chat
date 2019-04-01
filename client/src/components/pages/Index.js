import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import logo from "./frontdor_logo.png";

function Index() {
  return (
    <Jumbotron className="landingPageDiv">
        <img src={ logo } alt="Logo Placeholder" className="logoImage"/>
        <h2 className="landingPageHeader">FrontDor</h2>
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

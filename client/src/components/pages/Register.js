import React from "react";
import { Redirect, Link } from "react-router-dom";
import { fc } from "../../feathersClient";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    loading: false,
    error: null
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = () => {
    fc.authenticate({
      strategy: "local",
      email: this.state.email,
      password: this.state.password
    })
    .catch(error => this.setState({ error }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    fc.service("users")
      .create({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        this.login();
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return this.props.token ? (
      <Redirect to="/home" />
    ) : (
        <div className="formContainer">
          <h1>Register</h1>
          <form>
            <div className="formRow">
              <label htmlFor="name">Full Name</label>
              <input
                className="formInput"
                id="name"
                name="name"
                type="text"
                placeholder="name"
                autoFocus
                required
                onChange={this.handleInput}
              />
            </div>
            <br></br>
            <div className="formRow">
              <label htmlFor="email">Email</label>
              <input
                className="formInput"
                id="email"
                name="email"
                type="text"
                placeholder="email"
                required
                onChange={this.handleInput}
              />
            </div>
            <br></br>
            <div className="formRow">
              <label htmlFor="password">Password</label>
              <input
                className="formInput"
                id="password"
                type="password"
                name="password"
                placeholder="password"
                required
                onChange={this.handleInput}
              />
            </div>
            <br></br>
            <div className="formRow">
              <button className="formBtn" onClick={this.handleSubmit}>Register</button>
            </div>
          </form>
          <Link to="/login">already member? Login</Link>
        </div>
      );
  }
}

export default Register;

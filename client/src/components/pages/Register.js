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

  handleSubmit = e => {
    e.preventDefault();

    fc.service("users")
      .create({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
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
        <div>
          <Link to="/login">Login</Link>
          <form>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              autoFocus
              required
              onChange={this.handleInput}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="email"
              required
              onChange={this.handleInput}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="email"
              required
              onChange={this.handleInput}
            />

            <button onClick={this.handleSubmit}>Register</button>
          </form>
        </div>
      );
  }
}

export default Register;

import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { fc } from '../../feathersClient';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
    token: null,
  }

  /**
   * @param {e} the event
   *
   * This function handles user input and sets state accordingly
   * if there is an error, it will be cleared when user starts
   * typing again.
   */
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fc.authenticate({
      strategy: 'local',
      email: this.state.email,
      password: this.state.password,
    })
    .then(response => {
      this.setState({ token: response })
      return fc.passport.verifyJWT(response.accessToken);
    })
    // .then(payload => {
    //   return fc.service('users').get(payload.userId);
    // })
    // .then(user => {
    //   fc.set('user', user);
    // })
    .catch(error => {
      this.setState({ error })
    });
  }

  render() {
    return (
      this.state.token ? (
        <Redirect to="/home" />
      ) : (
      <div>
        <Link to="/register">Register</Link>
        {this.state.error ? (<p>{this.state.error.message}</p>) : '' }
        <form>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" placeholder="email" required onChange={this.handleInput} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" placeholder="email" required onChange={this.handleInput} />

          <button onClick={this.handleSubmit}>Login</button>
        </form>
      </div>
      )
    )
  }
}

export default Login;

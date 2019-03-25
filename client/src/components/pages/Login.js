import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { fc } from '../../feathersClient';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: null,
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
      .catch(error => {
        this.setState({ error })
      });
  }

  render() {
    return (
      this.props.token ? (
        <Redirect to="/home" />
      ) : (
          <div className="formContainer">
            <h1>Login</h1>
            {this.state.error ? (<p>{this.state.error.message}</p>) : ''}
            <form>
              <div className="formRow">
                <label htmlFor="email">Email</label>
                <input className="formInput" id="email" name="email" type="text" placeholder="email" required onChange={this.handleInput} />
              </div>
              <br></br>
              <div className="formRow">
                <label htmlFor="password">Password</label>
                <input className="formInput" id="password" type="password" name="password" placeholder="password" required onChange={this.handleInput} />
              </div>
              <br></br>
              <div className="formRow">
                <button className="formBtn" onClick={this.handleSubmit}>Login</button>
              </div> 
            </form>
            <Link to="/register">new here? Register</Link>
          </div>
        )
    )
  }
}

export default Login;

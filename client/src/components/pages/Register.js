import React from 'react';

class Register extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    loading: false,
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('trying to submit...')
  }

  render() {
    return (
      <div>
        <form>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text" placeholder="name" autoFocus required onChange={this.handleInput} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" placeholder="email" required onChange={this.handleInput} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" placeholder="email" required onChange={this.handleInput} />

        <button onClick={this.handleSubmit}>Register</button>

        </form>
      </div>
    )
  }
}

export default Register;


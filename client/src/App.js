import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './components/pages/Index';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { fc } from './feathersClient';

import './App.css';

class App extends Component {
  state = {
    token: false
  }

  componentDidMount() {
    /**
     * Check localStorage for a jwt token and attempt to authenticate the
     * token. If the token fails to pass authentication, then don't
     * do anything (fail silently).
     */
    fc.authenticate().catch(() => {});

    // On successful login
    fc.on('authenticated', response => {
      this.setState({ token: response.accessToken })
    })
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact render={props => <Login token={this.state.token} {...props} />} />
        <Route path="/register" exact render={props => <Register token={this.state.token} {...props} />} />
        <ProtectedRoute path="/home" exact token={this.state.token} component={Home} />
      </Router>
    )
  }
}

export default App;

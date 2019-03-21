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
    login: false
  }

  componentDidMount() {
    // On successfull login
    fc.on('authenticated', login => {
      console.log('successful login', login)
      this.setState({ login: true })
    })
  }

  render() {
    return(
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/home" exact login={this.state.login} component={Home} />
      </Router>
    )
  }
}

export default App;

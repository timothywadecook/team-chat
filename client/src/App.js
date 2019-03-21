import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Index from './components/pages/Index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Index</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/home">Home</Link></li>
          </ul>
        </nav>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Home} />
      </Router>
    );
  }
}

export default App;

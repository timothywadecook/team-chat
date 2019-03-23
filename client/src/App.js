import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './components/pages/Index';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import NoTeam from './components/pages/NoTeam';
import ProtectedRoute from './components/ProtectedRoute';
import { fc } from './feathersClient';

import './App.css';

class App extends Component {
  state = {
    token: false,
    activeUserId: "",
    activeTeamId: "",
    teamInput: ""
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
      const setUser = async (token) => {
        const payload = await fc.passport.verifyJWT(response.accessToken);
        const user = await fc.service("users").get(payload.userId);
        this.setState({
          token: token,
          activeUserId: user._id,
          activeTeamId: user.teamIds[0]
        });
      }
      setUser(response.accessToken);
    })
  }

  teamNameInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    })
  }

  teamCreate = (e) => {
      fc.service('teams').create({
          name: this.state.teamInput,
          ownerId: this.state.activeUserId
      })
      .then((data) => {
          this.setState({activeTeamId: data._id});
      });
  }


  render() {
    return (
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact render={props => <Login token={this.state.token} {...props} />} />
        <Route path="/register" exact render={props => <Register token={this.state.token} {...props} />} />
        <ProtectedRoute path="/home" exact token={this.state.token} activeTeamId={this.state.activeTeamId} activeUserId={this.state.activeUserId} teamNameInput={this.teamNameInput} teamCreate={this.teamCreate} teamName={this.state.teamInput} component={Home} />
        {/* <ProtectedRoute path="/noteam" exact activeTeamId={this.state.activeTeamId} activeUserId={this.state.activeUserId} component={NoTeam} /> */}
      </Router>
    )
  }
}

export default App;

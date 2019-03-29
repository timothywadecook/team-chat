import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './components/pages/Index';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { fc } from './feathersClient';

import './App.scss';

class App extends Component {
  state = {
    token: false,
    activeUser: {},
    activeTeamId: '',
    teamInput: '',
  };

  componentDidMount() {
    /**
     * Check localStorage for a jwt token and attempt to authenticate the
     * token. If the token fails to pass authentication, then don't
     * do anything (fail silently).
     */
    fc.authenticate().catch(() => {});
    // On successful login
    fc.on('authenticated', response => {
      const setUser = async token => {
        const payload = await fc.passport.verifyJWT(token);
        let user = await fc.service('users').get(payload.userId);
        const invitation = await fc.service('teams').find({ query: { invitedEmails: user.email } }); // only works for 1 invitation at a time right now
        if (invitation.data.length === 1) {
          const invitingTeamId = invitation.data[0]._id;
          const activeTeamId = invitingTeamId;
          user = await fc
            .service('users')
            .patch(user, { teamIds: invitingTeamId, activeTeamId: activeTeamId });
        }

        this.setState({
          token: token,
          activeUser: user,
          activeTeamId: user.activeTeamId,
        });
      };
      setUser(response.accessToken);
    });

    // Listen for when the user logs out
    fc.on('logout', response => {
      this.setState({
        token: null,
      });
    });
  }

  teamChange = event => {
    event.preventDefault();
    fc.service('users').patch(this.state.activeUser, { activeTeamId: event.target.value });
    this.setState({ activeTeamId: event.target.value });
  };

  teamNameInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null,
    });
  };

  teamCreate = e => {
    fc.service('teams').create({
        name: this.state.teamInput,
      })
      .then(data => {
        this.setState({ activeTeamId: data._id });
      });
  };

  render() {
    return (
      <Router>
        <Route path='/' exact component={Index} />
        <Route
          path='/login'
          exact
          render={props => <Login token={this.state.token} {...props} />}
        />
        <Route
          path='/register'
          exact
          render={props => <Register token={this.state.token} {...props} />}
        />
        <ProtectedRoute
          path='/home'
          exact
          token={this.state.token}
          activeTeamId={this.state.activeTeamId}
          activeUser={this.state.activeUser}
          teamNameInput={this.teamNameInput}
          teamCreate={this.teamCreate}
          teamName={this.state.teamInput}
          teamChange={this.teamChange}
          component={Home}
        />
      </Router>
    );
  }
}

export default App;

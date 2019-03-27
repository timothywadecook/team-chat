import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, token, activeTeamId, activeUser, teamNameInput, teamCreate, teamChange, teamName, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component activeTeamId={activeTeamId} activeUser={activeUser} teamCreate={teamCreate} teamNameInput={teamNameInput} teamChange={teamChange} teamName={teamName} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/register",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute

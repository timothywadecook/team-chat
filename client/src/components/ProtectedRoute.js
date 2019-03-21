import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, token, activeTeamId, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component activeTeamId={activeTeamId} {...props} />
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

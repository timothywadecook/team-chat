import React, { Component } from 'react';

function NoMatch({ location }) {
  return (
    <div>
      <h3>No Match for {location.pathname}</h3>
    </div>
  );
}

export default NoMatch

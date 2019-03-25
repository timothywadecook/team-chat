import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h2>Index</h2>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Index;

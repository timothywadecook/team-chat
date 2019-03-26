import React from 'react';
import { fc } from '../feathersClient';

function Logout() {
  return (
    <button className="btn btn-primary" onClick={() => fc.logout() }>Logout</button>
  )
}

export default Logout

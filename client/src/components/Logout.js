import React from 'react';
import { fc } from '../feathersClient';

function Logout() {
  return (
    <button onClick={() => fc.logout() }>Logout</button>
  )
}

export default Logout

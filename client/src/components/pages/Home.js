import React from 'react';
import CreateGroup from './createGroup'

function Home(props) {
  const activeTeamId = props.activeTeamId;
  return activeTeamId ? (<h2>Home for team {activeTeamId}</h2>) 
  : <CreateGroup/>

}

export default Home;


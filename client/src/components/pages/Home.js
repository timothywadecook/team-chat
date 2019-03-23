import React from 'react';
import CreateTeam from './CreateTeam'
import TeamPage from './TeamPage'

function Home(props) {
  const activeTeamId = props.activeTeamId;
  return activeTeamId ? <TeamPage/>
  : <CreateTeam/>

}

export default Home;


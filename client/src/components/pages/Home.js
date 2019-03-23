import React from 'react';
import CreateTeam from './createTeam'
import TeamPage from './TeamPage'

function Home(props) {
  const activeTeamId = props.activeTeamId;
  return activeTeamId ? <TeamPage/>
  : <CreateTeam activeUserId={props.activeUserId}/>

}

export default Home;


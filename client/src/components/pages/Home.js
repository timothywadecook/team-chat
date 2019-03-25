import React from 'react';
import CreateTeam from './CreateTeam'
import TeamPage from './TeamPage'

function Home(props) {
  return props.activeTeamId ? <TeamPage {...props}/>
  : <CreateTeam teamCreate={props.teamCreate} teamNameInput={props.teamNameInput}/>

}

export default Home;


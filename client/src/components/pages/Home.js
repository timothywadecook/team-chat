import React from 'react';
import CreateTeam from './CreateTeam'
import TeamPage from './TeamPage'

function Home(props) {
  const activeTeamId = props.activeTeamId;
  console.log(activeTeamId)
  return activeTeamId ? <TeamPage activeUser={props.activeUser} {...props}/>
  : <CreateTeam teamCreate={props.teamCreate} teamNameInput={props.teamNameInput}/>

}

export default Home;


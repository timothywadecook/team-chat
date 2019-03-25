import React from 'react';
import { Link } from 'react-router-dom';
import CreateTeam from './CreateTeam'
import TeamPage from './TeamPage'
import Logout from '../Logout'

function Home(props) {
  return (
    <div>
        <Logout />
      {props.activeTeamId ?
        <TeamPage {...props}/> :
        <CreateTeam teamCreate={props.teamCreate} teamNameInput={props.teamNameInput}/>}
    </div>
  )

}

export default Home;


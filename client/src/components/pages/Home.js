import React from 'react';

function Home(props) {
  const activeTeam = props.activeTeam;
  return activeTeam ? (<h2>Home for team {activeTeam.name}</h2>) : (<h2>You aint got no team</h2>)
}

export default Home;


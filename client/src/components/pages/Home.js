import React from 'react';

function Home(props) {
  const activeTeamId = props.activeTeamId;
  return activeTeamId ? (<h2>Home for team {activeTeamId}</h2>) : (<h2>You aint got no team</h2>)
}

export default Home;


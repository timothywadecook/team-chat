import React from 'react';

class noTeam extends React.Component {
  state = {
    TeamInput: ""
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    })
  }
  
  
  
  
  render () {
    return (<div><h2>No Team</h2> <p>What's Up everyone?</p>
  
    </div>)
  }
  
}

export default noTeam;

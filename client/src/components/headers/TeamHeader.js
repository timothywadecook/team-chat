import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import CreateTeamModal from "../modals/CreateTeamModal";
import { fc } from "../../feathersClient";

/**
 * This is the header for the sidebar that allows the user to switch teams
 */
class TeamHeader extends React.Component {
  state = {
    dropdownOpen: false,
    modal: false,
    teams: []
  };

  componentDidMount(){
    this.getTeams();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.teams && this.state.teams.length !== prevState.teams.length){
      console.log("update is running");
      this.getTeams();
    }
  }

  getTeams(){
    const teamNames = [];
    for(let i = 0; i < this.props.activeUser.teamIds.length; i++){
      fc.service("teams").find(this.props.activeUser.teamIds[i])
        .then(function(team){
          console.log('teams this user is on', team);
          teamNames.push(team.data[i]);
        });
    }
    this.setState({teams: teamNames});
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleModal = () => {
    this.setState({modal: !this.state.modal});
  }

  render() {
    const { dropdownOpen } = this.state;
    const { teamName } = this.props;

    return (
      <div className="d-flex justify-content-center mb-4">
        <ButtonDropdown color="bg-white" isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{ teamName }</DropdownToggle>
          <DropdownMenu>
            {this.state.teams && this.state.teams.map((team, i) => <DropdownItem key={i} onClick={this.props.teamChange} value={team._id}>{team.name}</DropdownItem>)}
            <DropdownItem onClick={this.toggleModal}>Create Team</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <CreateTeamModal activeUser={this.props.activeUser} modalState={this.state.modal} toggle={this.toggleModal}/>
      </div>
    );
  }
}

export default TeamHeader;

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
    const teamNames = [];
    fc.service("users").find({query: {_id: this.props.activeUser._id}})
      .then(async user => {
        if(this.state.teams && this.state.teams.length !== user.data[0].teamIds.length){
          for(let i = 0; i < user.data[0].teamIds.length; i++){
            await fc.service("teams").find({query: {_id: user.data[0].teamIds[i]}})
              .then(async (team) => {
                await teamNames.push(team.data[0]);
              })
          }
          this.setState({teams: teamNames});
        }
      });
  }

  async getTeams(){
    const teamNames = [];
    for(let i = 0; i < this.props.activeUser.teamIds.length; i++){
      await fc.service("users").find({query: {_id: this.props.activeUser._id}})
        .then(async (user) => {
          await fc.service("teams").find({query: {_id: user.data[0].teamIds[i]}})
            .then(async (team) => {
              await teamNames.push(team.data[0]);
            });
        });
    }
    console.log(teamNames);
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
      <div className="teamDropDown sticky-top">
        <div className="d-flex justify-content-center mb-4 dropDown">
          <ButtonDropdown className="switchTeamBtn" isOpen={dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{ teamName }</DropdownToggle>
            <DropdownMenu>
              {this.state.teams && this.state.teams.map((team, i) => <DropdownItem key={i} onClick={this.props.teamChange} value={team._id}>{team.name}</DropdownItem>)}
              <DropdownItem onClick={this.toggleModal}>Create Team</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <CreateTeamModal activeUser={this.props.activeUser} modalState={this.state.modal} toggle={this.toggleModal}/>
        </div>
      </div>
      
    );
  }
}

export default TeamHeader;

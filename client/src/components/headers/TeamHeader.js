import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

/**
 * This is the header for the sidebar that allows the user to switch teams
 */
class TeamHeader extends React.Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { dropdownOpen } = this.state;
    const { teamName } = this.props;

    return (
      <div className="d-flex justify-content-center mb-4">
        <ButtonDropdown color="bg-white" isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{ teamName }</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Action</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default TeamHeader;

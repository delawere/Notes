import React, { Component } from 'react';
import fire from '../../config/Fire';
import styled from 'styled-components';
import UserSchedule from './UserSchedule';
import PropTypes from 'prop-types';

const AsideContainer = styled.aside `
  height: 100%;
  width: 15vw;
  position: fixed;
/*   background: #242425; */
  background: #fff;
  top: 0;
  left: 0;
  border-right: 1px solid #a8a8a8;
`

const SearchPanel = styled.div `
  margin: 20px 50px;
`

const SearchInput = styled.input `
  width: 100%;
  background-color: inherit;
  border-style: none;
  text-align: center;
  outline: none;
  border-bottom: 1px solid #0071bc;
`

const LogOutButton = styled.button `
  background-color: inherit;
  border: none;
  color: #fff;
`

class AsideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {}
    }
  } 
  
  logout = () => {
    fire.auth().signOut(); 
  }

  static getDerivedStateFromProps(props) {
    return ({
      tasks: props.usersData
    })
  };

  render() {
    return (
      <AsideContainer>
        <LogOutButton onClick={this.logout}>Log out</LogOutButton>
        <SearchPanel>
          <SearchInput type="text" placeholder = "Search"/>
        </SearchPanel>
        <UserSchedule onClickDay = {this.props.onClickDay} 
                      usersData = {this.state.tasks}/>
      </AsideContainer> 
    )
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func, 
  usersData: PropTypes.object
};

export default AsideMenu;
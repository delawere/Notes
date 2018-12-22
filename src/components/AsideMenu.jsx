import React, { Component } from 'react';
import fire from '../config/Fire';
import styled from 'styled-components';
import UserSchedule from './UserSchedule';

const AsideContainer = styled.aside `
  height: 100%;
  width: 15vw;
  position: fixed;
  background: rgba(194, 194, 194);
  top: 0;
  left: 0;
`

const SearchPanel = styled.div `
  width: 70%;
  margin: auto;
  margin-top: 25px;
`

const SearchInput = styled.input `
  width: 100%;
  border-radius: 5px;
  background-color: rgba(171, 171, 171);
  border-style: none;
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
        <button onClick={this.logout} className="btn btn-secondary">Выйти</button>
        <SearchPanel>
          <span></span>
          <SearchInput type="text" placeholder = "Search"/>
        </SearchPanel>
        <UserSchedule onClickDay = {this.props.onClickDay} 
                      usersData = {this.state.tasks}/>
      </AsideContainer> 
    )
  }


}

export default AsideMenu;
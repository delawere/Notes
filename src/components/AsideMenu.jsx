import React, { Component } from 'react';
import fire from '../config/Fire';
import styled from 'styled-components';

import UsersItem from './UsersItem';

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

const AsideList = styled.ul `

`

const AddButton = styled.button `

`


class AsideMenu extends Component {
  
  logout = () => {
    fire.auth().signOut(); 
  }

  render() {
    return (
      <AsideContainer>
        <UsersItem />
        <button onClick={this.logout} className="btn btn-secondary">Выйти</button>
        <SearchPanel>
          <span></span>
          <SearchInput type="text" placeholder = "Search"/>
        </SearchPanel>
        <AsideList></AsideList>
        <AddButton></AddButton>
      </AsideContainer> 
    )
  }


}

export default AsideMenu;
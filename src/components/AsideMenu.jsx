import React, { Component } from 'react';
import fire from '../config/Fire';
import styled from 'styled-components';

const AsideContainer = styled.aside `
  height: 100%;
  width: 15vw;
  position: fixed;
  background: #4A4A4A;
  opacity: 0.4;
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
  background-color: #787878;
  border-style: none;
  opacity: 1;
`

const AsideList = styled.ul `

`

const AddButton = styled.button `

`


class AsideMenu extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    fire.auth().signOut(); 
  }

  render() {
    return (
      <AsideContainer>
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
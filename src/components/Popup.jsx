import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

import PopupListItem from './PopupListItem';

const Wrapper = styled.div `
  position: fixed;
  height: 100%;
  width: 85vw;
  z-index: 999;
  top: 0;
  left: 15vw;
  background: #667db6;
  background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); 
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
`

const PopupContainer = styled.div `
  width: 65%;
  background-color: rgb(250,250,250);
  border-radius: 10px;
  margin: auto;
  margin-top: 50px;
  padding: 40px 15px;
  padding-top: 0;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
`

const PopupHeader = styled.header `
  width: 100%;
  padding: 20px 0;
  font-size: 1.8rem;
  font-weight: 450;
`

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      tasks: []
    }
  }

  render() {
    return (
      <Wrapper>
        <PopupContainer>
          <PopupHeader>
            {moment(this.props.tasks.date).format('D MMMM')}
          </PopupHeader>
          <PopupListItem text = {this.props.tasks.task} />
        </PopupContainer>
      </Wrapper>
    )
  }
}

export default Popup;
import React, { Component } from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div `
  position: fixed;
  width: 400px;
  height: 800px;
  background-color: rgba(247, 247, 247, 1);
  z-index: 999;
  border-radius: 5px;
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
      <PopupContainer></PopupContainer>
    )
  }
}

export default Popup;
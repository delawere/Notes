import React, { Component } from 'react';
import styled from 'styled-components';

import PopupListItem from './PopupListItem';
import AddButton from './AddButton';

const AddFormContainer = styled.div `
  width: 60%;
  heigth: 50px;
  display: flex;
`

const Input = styled.input `
    flex: 1;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 24px;
    margin-bottom: 15px;
    margin-right: 20px;
    color: #898989;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: text;
    font-family: 'pt_sansregular', sans-serif;
    font-size: 18px;

    &:focus,
    &:hover {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      tasks: []
    }
  }

  render() {
    return (
     <AddFormContainer>
       <Input></Input>
       <AddButton></AddButton>
     </AddFormContainer>
    )
  }
}

export default AddForm;
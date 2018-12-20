import React, { Component } from 'react';
import styled from 'styled-components';

import AddButton from './AddButton';
import fire from '../config/Fire'

const db = fire.database();
const userId = localStorage.getItem('user');

const AddFormContainer = styled.div `
  width: 60%;
  heigth: 50px;
  display: flex;
`

const Input = styled.input `
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 24px;
    margin-bottom: 15px;
    color: #898989;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: text;
    font-family: 'pt_sansregular',sans-serif;
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
      task: '',
      key: ''
    }
  }

  onChangeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value  });
  };

  addNewTask = async () => {
    try {
      const dayRef = db.ref(`users/${userId}/tasks/`).child(this.props.date);
      const newTaskKey = dayRef.push().key;
      const update = {};
      update[newTaskKey] = this.state.task;
      await dayRef.update(update);
      this.setState({
        key: newTaskKey
      }, () => {
        this.props.refreshDataSet(this.state);
      });
    } catch(error) {
      console.error(`Add failed. Error: ${error}`)
    };
  };

  render() {
    return (
     <AddFormContainer>
       <Input name = "task" 
              onChange = {this.onChangeInput} >
       </Input>
       <AddButton addNewTask = {this.addNewTask} />
     </AddFormContainer>
    )
  }
}

export default AddForm;
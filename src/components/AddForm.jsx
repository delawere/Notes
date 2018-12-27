import React, { Component } from 'react';
import styled from 'styled-components';

import AddField from './AddField';
import AddButton from './AddButton';
import fire from '../config/Fire'

const db = fire.database();
const userId = localStorage.getItem('user');

const AddFormContainer = styled.div `
  width: 60%;
  heigth: 50px;
  display: flex;
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

    this.setState({
      task: ''
    })
  };

  render() {
    return (
     <AddFormContainer>
       <AddField name = "task" 
                 onChange = {this.onChangeInput}
                 value = {this.state.task} >
       </AddField>
       <AddButton addNewTask = {this.addNewTask} />
     </AddFormContainer>
    )
  }
}

export default AddForm;
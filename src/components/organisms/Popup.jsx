import React, { Component } from 'react';
import fire from '../../config/Fire';
import styled from 'styled-components';
import * as moment from 'moment';

import PopupListItem from '../molecules/PopupListItem';
import AddForm from '../molecules/AddForm';
import ClosePopupButton from '../atoms/ClosePopupButton';

const Wrapper = styled.div `
  position: fixed;
  height: 80%;
  width: 60vw;
  z-index: 999;
  top: 8%;
  left: 25vw;
/*   background: #242425; */
  background: #f7f7f7;
  color: #242425;
`

const PopupContainer = styled.div `
  width: 65%;
  background-color: #f7f7f7;
  border-radius: 10px;
  margin: auto;
  margin-top: 50px;
  padding: 40px 15px;
  padding-top: 0;
`

const PopupHeader = styled.header `
  width: 100%;
  padding: 20px 0;
  font-size: 1.8rem;
  font-weight: 450;
`

const database = fire.database();
const userId = localStorage.getItem('user');

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullDate: '',
      date: '',
      tasks: []
    }
  }

  static getDerivedStateFromProps(props) {
    let taskArray = [];
    if (typeof props.tasks.task === 'object') {
      for (let key in props.tasks.task) {
        taskArray.push({
          key: key,
          text: props.tasks.task[key]
        });
      };
    } else {
      props.tasks.task ? taskArray.push(props.tasks.task) : null;
    };
    return({
      fullDate: props.date,
      date: moment(props.tasks.date).format('D MMMM'),
      tasks: taskArray
    });
  };

  refreshDataSet = (newTask) => {
    const { key, task } = newTask;
    const currentTasks = this.state.tasks;
    currentTasks.push({
      key,
      text: task
    });
    this.setState({
      tasks: currentTasks
    });
    this.props.onAfterSubmit();
  };

  removeTask = (key) => {
    const currentDate = moment(this.props.tasks.date).format('MM-DD-YYYY');
    database.ref(`users/${userId}/tasks/${currentDate}/${key}`).remove();
    const removedElemIndex = this.state.tasks.findIndex((task) => task.key === key);
    const currentTasks = this.state.tasks;
    delete currentTasks[removedElemIndex];
    this.setState({
      tasks: currentTasks
    });
    this.props.onAfterSubmit();
  }

  render() {
    return (
      <Wrapper>
        <ClosePopupButton closePopup = {this.props.closePopup}/>
        <span>{this.props.tasks === 'String' ? this.props.tasks : null}</span>
        <PopupContainer>
          <PopupHeader>
            {moment(this.props.tasks.date).format('D MMMM')}
          </PopupHeader>
          <fieldset>
            <legend>To-Do List</legend>
            {this.state.tasks.map(task => (
              <PopupListItem text = {task.text} 
                             key = {task.key} 
                             taskKey = {task.key}
                             onRemove = {this.removeTask} />
            ))}
          </fieldset>
          <AddForm date = {moment(this.props.tasks.date).format('MM-DD-YYYY')} 
                   refreshDataSet = {this.refreshDataSet} />
        </PopupContainer>
      </Wrapper>
    )
  }
}

export default Popup;
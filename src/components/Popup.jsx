import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

import PopupListItem from './PopupListItem';
import AddForm from './AddForm';
import ClosePopupButton from './ClosePopupButton';

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

  componentDidMount() {
    let taskArray = [];
    if (typeof this.props.tasks.task === 'object') {
      taskArray = Object.values(this.props.tasks.task);
    } else {
      taskArray.push(this.props.tasks.task);
    };
    this.setState({
      date: moment(this.props.tasks.date).format('D MMMM'),
      tasks: taskArray
    });
  }

  refreshDataSet = (newTask) => {
    const { key, task } = newTask;
    const currentTasks = this.state.tasks;
    currentTasks.push(task);
    this.setState({
      tasks: currentTasks
    });
  };

  render() {
    return (
      <Wrapper action = {this.props.closePopup}>
        <ClosePopupButton action = {this.props.closePopup}/>
        <span>{this.props.tasks === 'String' ? this.props.tasks : null}</span>
        <PopupContainer>
          <PopupHeader>
            {moment(this.props.tasks.date).format('D MMMM')}
          </PopupHeader>
          {this.state.tasks.map(task => (
            <PopupListItem text = {task} />
          ))}
          <AddForm date = {moment(this.props.tasks.date).format('MM-DD-YYYY')} 
                   refreshDataSet = {this.refreshDataSet} />
        </PopupContainer>
      </Wrapper>
    )
  }
}

export default Popup;
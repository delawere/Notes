import React, { Component } from 'react';
import fire from '../config/Fire';
import AsideMenu from './AsideMenu';
import FirebaseRequest from './FirebaseRequest';
import Popup from './Popup';


const database = fire.database();
const userId = localStorage.getItem('user');

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
      currentDayTasks: {},
      currentDayDate: '',
      tasks: {}
    }
  }

  onClickDay = (data) => {
    const { date } = data;
    this.setState({
      popupVisible: true,
      currentDayTasks: data,
      currentDayDate: date
    });
  };

  componentDidMount () {
    this.getUsersData();

    this.setState({
      currentDayTasks: this.state.tasks[this.state.currentDayDate]
    });
  }

  async getTasks() {
    let result = {};
    const tasks = database.ref(`users/${userId}/tasks`).once('value', snap => {
      result = snap.val() || {};
    });
    await tasks;

    return result
  }

  getUsersData = async () => {
    const usersData = await FirebaseRequest.getData();
    this.setState({
      tasks: usersData
    });
  };

  closePopup = async () => {
    await this.getUsersData();
    this.setState({
      popupVisible: false
    });
  };

  render() {
    return (
      <div className="container">
      { }
        <AsideMenu onClickDay = {this.onClickDay} 
                   usersData = {this.state.tasks}/> 
        { this.state.popupVisible 
          ? <Popup tasks = { this.state.currentDayTasks } 
                   closePopup = {this.closePopup} /> 
          : null }
      </div> 
    );
  }
  
}

export default Home;
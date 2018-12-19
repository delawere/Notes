import React, { Component } from 'react';
import fire from '../config/Fire';
import UserSchedule from './UserSchedule';
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
      popupTasks: {},
      date: '',
      //переписать
      testTask: {}
    }
  }

  onClickDay = (data) => {
    const {date, task} = data;
    this.setState({
      popupVisible: true,
      popupTasks: data,
      date: date
    });
  };

  componentDidMount () {
    this.getUsersData();
    database.ref(`users/${userId}/tasks/${this.state.date}`).on('child_added', snap => {
      const { key } = snap;
      this.setState({
        popupTasks: snap.val()
      })
    });
  }

  getUsersData = async () => {
    const usersData = await FirebaseRequest.getData();
    //переписать
    this.setState({
      testTask: usersData
    });
  };

  render() {
    return (
      <div className="container">
        <UserSchedule onClickDay = {this.onClickDay} 
                      //переписать
                      usersData = {this.state.testTask}/>
        <AsideMenu />
        { this.state.popupVisible 
          ? <Popup tasks = { this.state.popupTasks }/> 
          : null }
      </div> 
    );
  }
  
}

export default Home;
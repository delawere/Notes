import React, { Component } from 'react';
import fire from '../config/Fire';
import UserSchedule from './UserSchedule';
import AsideMenu from './AsideMenu';
import FirebaseRequest from './FirebaseRequest';
import Popup from './Popup';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
      popupTasks: {}
    }
  }

  onClickDay = (text) => {
    this.setState({
      popupVisible: true,
      popupTasks: text
    });
  }

  render() {
    return (
      <div className="container">
        <UserSchedule onClickDay = {this.onClickDay}/>
        <AsideMenu />
        { this.state.popupVisible 
          ? <Popup tasks = { this.state.popupTasks }/> 
          : null }
      </div> 
    );
  }
  
}

export default Home;
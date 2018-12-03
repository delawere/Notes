import React, { Component } from 'react';
import fire from '../config/Fire';
import UserSchedule from './UserSchedule';
import AsideMenu from './AsideMenu';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beginTime: '',
      endTime: ''
    }
  }

  render() {
    return (
      <div className="container">
        <UserSchedule />
        <AsideMenu />
      </div> 
    );
  }
  
}

export default Home;
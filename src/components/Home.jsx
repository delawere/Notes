import React, { Component } from 'react';
import fire from '../config/Fire';
import InputGroup from './InputGroup';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beginTime: '',
      endTime: ''
    }
  }

  logout = () => {
    fire.auth().signOut(); 
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.logout} className="btn btn-secondary">Выйти</button>
        <InputGroup updateData = {this.updateData} />
      </div> 
    );
  }
  
}

export default Home;
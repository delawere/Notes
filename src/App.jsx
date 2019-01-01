import React, { Component } from 'react';
import fire from './config/Fire';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Form from './components/templates/Form';
import Home from './components/templates/Home';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        user:{},
      }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem( 'user' );
      }
    });
  }

  render() {
    return (
      <div style={{'background': '#000'}}>
        {this.state.user ? (<Home />) : (<Form />)}
      </div>
    );
  }
}

export default App;

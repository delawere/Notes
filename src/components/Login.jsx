import React, { Component } from 'react';
import fire from '../config/Fire';

import Input from './Input';

const containerStyle = { 
  'width': '40%',
  'marginTop': '50px',
  'padding': '30px'
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  login = (e) => {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => { 
    }).catch((error) => {
      alert(error);
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="container" style={containerStyle}>

        <Input 
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="form-control"
            placeholder="email"
        /> 

        <Input 
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Пароль"
        />

        <div className="form-group row">
          <button onClick={this.login} className="btn btn-primary center-block  col-6">Войти</button>
        </div>  

      </form>
    );
  }
}

export default Login;
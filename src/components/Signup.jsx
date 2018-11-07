import React, { Component } from 'react';
import fire from '../config/Fire';

import Input from './Input';

const containerStyle = { 
  'width': '60%',
  'marginTop': '50px',
  'padding': '30px'
}

const regexp = {
  email:    /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
  name:     /^[a-z0-9_-]{3,16}$/,
  password: /^[a-z0-9_-]{6,18}$/
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      passwordValid: {
        safetyCheck: false,
        lengthCheck: false,
      }
    }
  }

  signup = (e) => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userData => {
      let uid = userData.user.uid;
      const ROOT_REF = fire.database().ref().child('users');
      ROOT_REF.update({
        [uid]: {
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email
        } 
      })
    }) 
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if(name === 'password') {
      this.setState({
        passwordValid: {
          safetyCheck: regexp.password.test(value),
          lengthCheck: value.length >= 8
        }
      });
    }
  }

  render() {
    return (
      <form className="container" style={containerStyle}>

        <Input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="Имя"
        />

        <Input 
            type="text"
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="Фамилия"
        />

        <Input 
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="email"
        /> 

        <Input 
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="Пароль"
        />

        <div className="form-group row">
          <button onClick={this.signup} className="btn btn-success center-block col-6">Регистрация</button>
        </div>  
      </form>
    );
  }
}

export default Signup;
import React, { Component } from 'react';
import fire from '../../config/Fire';
import styled from 'styled-components';

import Input from '../atoms/Input';
import LoginFormTitle from '../atoms/LoginFormTitle';
import ErrorPopup from '../molecules/ErrorPopup';

const Button = styled.button`
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  display: block;
  margin: 0 auto;
  margin-top: 1.6em;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.4em 1.8em;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

const Form = styled.form`
  box-sizing: border-box;
  width: 45%;
  margin: 0 auto;
  margin-top: 50px;
`;

const PasswordRules = styled.p`
  color: #999;
  margin-top: -0.7em;
`;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userData => {
        let uid = userData.user.uid;
        const ROOT_REF = fire
          .database()
          .ref()
          .child('users');
        ROOT_REF.update({
          [uid]: {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email
          }
        });
      })
      .catch(e => {
        this.setState({
          error: e.message
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'password') {
      this.setState({
        passwordValid: {
          lengthCheck: value.length >= 8
        }
      });
    }
  };

  render() {
    return (
      <div>
        <LoginFormTitle name={'Sign Up'} />
        <ErrorPopup errorMessage={this.state.error} />
        <Form>
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            placeholder="email"
          />

          <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            placeholder="Password"
          />
          <PasswordRules>Minimum 6 characters</PasswordRules>

          <Button onClick={this.signup}>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

export default Signup;

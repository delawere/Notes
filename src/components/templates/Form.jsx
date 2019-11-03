import React, { Component } from 'react';
import styled from 'styled-components';
import fire from '../../config/Fire';
import { addUser } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { LANDING } from '../../router/constants';

import Header from '../organisms/Header';
import Auth from '../organisms/Auth';

const LogForm = styled.div`
  margin: 0 auto;
  max-width: 630px;
  margin-top: 125px;
`;

const putActionsToProps = dispatch => {
  return {
    addUser: bindActionCreators(addUser, dispatch)
  };
};

const putStateToProps = state => {
  return {
    user: state.user
  };
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
      signup: false,
      email: '',
      password: '',
      error: ''
    };
  }

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.props.addUser(u.user.uid);
      })
      .catch(e => {
        this.setState({
          error: e.message
        });
      });
  };

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
    this.setState({ [e.target.name]: e.target.value });
  };

  openForm = e => {
    const name = e.target.name;

    this.setState({ error: '' });
    if (name === 'login') this.setState({ login: true, signup: false });
    if (name === 'signup') this.setState({ login: false, signup: true });
  };

  render() {
    if (this.props.user) {
      return <Redirect to={LANDING} />;
    }

    return (
      <main>
        <Header openForm={this.openForm} />
        <LogForm>
          <Auth
            name={this.state.login ? 'Log In' : 'Sign Up'}
            errorMessage={this.state.error}
            emailProps={{
              type: 'email',
              name: 'email',
              value: this.state.email,
              onChange: this.handleChange,
              placeholder: 'email'
            }}
            passwordProps={{
              type: 'password',
              name: 'password',
              value: this.state.password,
              onChange: this.handleChange,
              placeholder: 'password',
              rules: this.state.signup ? 'Minimum 6 characters' : ''
            }}
            onClick={this.state.login ? this.login : this.signup}
          />
        </LogForm>
      </main>
    );
  }
}

Form = connect(
  putStateToProps,
  putActionsToProps
)(Form);

export default Form;

import React, { Component } from "react";
import fire from "../../config/Fire";
import { addUser } from "../../store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { LANDING } from "../../router/constants";
import styled from "styled-components";

import Input from "../atoms/Input";
import LoginFormTitle from "../atoms/LoginFormTitle";

const Button = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  display: block;
  margin: 0 auto;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;

const Form = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 30px;
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
      .catch(error => {
        console.error(error);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.user) {
      return <Redirect to={LANDING} />;
    }
    return (
      <div>
        <LoginFormTitle name={"Log In"} />
        <Form>
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
            placeholder="Password"
          />
            <Button
              onClick={this.login}
              className="btn btn-primary center-block  col-6"
            >
              Log in
            </Button>
        </Form>
      </div>
    );
  }
}

Login = connect(
  putStateToProps,
  putActionsToProps
)(Login);

export default Login;

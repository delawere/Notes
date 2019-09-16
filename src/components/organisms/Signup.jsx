import React, { Component } from "react";
import fire from "../../config/Fire";
import styled from "styled-components";

import Input from "../atoms/Input";
import LoginFormTitle from "../atoms/LoginFormTitle";

const Button = styled.button`
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
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
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

const Form = styled.form`
  width: 40%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 30px;
`;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      surname: "",
      passwordValid: {
        safetyCheck: false,
        lengthCheck: false
      }
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
          .child("users");
        ROOT_REF.update({
          [uid]: {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email
          }
        });
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "password") {
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
        <LoginFormTitle name={"Sign Up"} />
        <Form>
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
            placeholder="Password"
          />

          <Button onClick={this.signup}>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

export default Signup;

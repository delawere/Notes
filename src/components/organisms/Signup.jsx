import React, { Component } from "react";
import fire from "../../config/Fire";

import Input from "../atoms/Input";
import LoginFormTitle from "../atoms/LoginFormTitle";

const containerStyle = {
  width: "60%",
  marginTop: "50px",
  padding: "30px"
};

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
        <form className="container" style={containerStyle}>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="Name"
          />

          <Input
            type="text"
            name="surname"
            value={this.state.surname}
            onChange={this.handleChange}
            onFocus={this.showHelp}
            className="form-control"
            placeholder="Surname"
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
            placeholder="Password"
          />

          <div className="form-group row">
            <button
              onClick={this.signup}
              className="btn btn-success center-block col-6"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;

import React, { Component } from "react";
import fire from "../../config/Fire";
import { addUser } from "../../store/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Input from "../atoms/Input";
import LoginFormTitle from "../atoms/LoginFormTitle";

const containerStyle = {
  width: "40%",
  marginTop: "50px",
  padding: "30px"
};

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
      return <Redirect to="/" />;
    }
    return (
      <div>
        <LoginFormTitle name={"Log In"} />
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
            placeholder="Password"
          />

          <div className="form-group row">
            <button
              onClick={this.login}
              className="btn btn-primary center-block  col-6"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login = connect(
  putStateToProps,
  putActionsToProps
)(Login);

export default Login;

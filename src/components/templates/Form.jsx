import React, { Component } from "react";

import Login from "../organisms/Login";
import Signup from "../organisms/Signup";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      signup: false
    };
  }

  openLoginForm = e => {
    this.setState({ [e.target.name]: true });
    e.target.name === "login"
      ? this.setState({ signup: false })
      : this.setState({ login: false });
  };

  render() {
    return (
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-inverse bg-inverse">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" name="login" onClick={this.openLoginForm}>
                  Войти
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" name="signup" onClick={this.openLoginForm}>
                  Регистрация
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.login ? <Login /> : null}
        {this.state.signup ? <Signup /> : null}
      </div>
    );
  }
}

export default Form;

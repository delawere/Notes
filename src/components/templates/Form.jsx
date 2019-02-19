import React, { Component } from "react";
import styled from "styled-components";

import Login from "../organisms/Login";
import Signup from "../organisms/Signup";
import Header from "../organisms/Header";

const LogForm = styled.div`
  margin: 0 auto;
  max-width: 630px;
  margin-top: 125px;
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true,
      signup: false
    };
  }

  openForm = e => {
    const name = e.target.name;
    if (name === "login") this.setState({ login: true, signup: false });
    if (name === "signup") this.setState({ login: false, signup: true });
  };

  render() {
    return (
      <main>
        <Header openForm={this.openForm} />
        <LogForm>
          {this.state.login ? <Login /> : null}
          {this.state.signup ? <Signup /> : null}
        </LogForm>
      </main>
    );
  }
}

export default Form;

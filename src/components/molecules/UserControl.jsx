import React, { PureComponent } from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */
import fire from "../../config/Fire";

const UserInfoContainer = styled.div`
  color: #0070c9;
  padding: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e3e3e3;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

class UserControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userEmail: ""
    };
  }

  componentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        const userName = userEmail.substring(0, userEmail.search("@"));

        this.setState({
          userName,
          userEmail
        });
      }
    });
  }

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <UserInfoContainer>
        <UserName onClick={this.logout}>Log out {this.state.userName}</UserName>
      </UserInfoContainer>
    );
  }
}

UserControl.propTypes = {};

export default UserControl;

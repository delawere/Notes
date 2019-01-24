import React, { PureComponent } from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */
import fire from "../../config/Fire";

const UserInfoContainer = styled.div`
  color: #0070c9;
  width: 100%;
  padding: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e3e3e3;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const SVG = styled.svg`
  margin-right: 12px;
  fill: #0070c9;
`;

class UserInfo extends PureComponent {
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
        <SVG
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <title>person</title>
          <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z" />
        </SVG>
        <UserName>Log out {this.state.userName}</UserName>
      </UserInfoContainer>
    );
  }
}

UserInfo.propTypes = {};

export default UserInfo;

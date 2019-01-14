import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import fire from "../../config/Fire";

const UserInfoContainer = styled.div`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: rgba(187, 187, 187, 0.3);
  justify-content: space-between;
`;

const UserName = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 15px;
  font-weight: 300;
  font-style: italic;
  margin: 0;
`;

const LogOutButton = styled.button`
  border: none;
  max-width: 110px;
  font-size: 14px;
  font-weight: 400;
  padding: 5px 25px;
  border-radius: 3px;
  box-sizing: content-box;
  align-self: flex-end;
  background: rgba(187, 187, 187, 0.8);
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
        <div>
          <UserName>{this.state.userName}</UserName>
          <UserEmail>{this.state.userEmail}</UserEmail>
        </div>
        <LogOutButton onClick={this.logout}>Log out</LogOutButton>
      </UserInfoContainer>
    );
  }
}

UserInfo.propTypes = {};

export default UserInfo;

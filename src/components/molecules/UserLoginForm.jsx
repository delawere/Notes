import React from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */

const UserInfoContainer = styled.div`
  color: #0070c9;
  padding: 15px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e3e3e3;
`;

const Link = styled.a`
  cursor: pointer;
  user-select: none;
  transition: background 120ms ease-in 0s;
  width: auto;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  font-size: 15px;
  margin-left: 2px;
  margin-right: 2px;
  font-weight: 500;
  color: rgb(4, 4, 2);
`;

const UserLoginForm = ({ openForm }) => (
  <UserInfoContainer onClick={openForm}>
    <Link name="login">Log in</Link>
    <Link name="signup">Sign up</Link>
  </UserInfoContainer>
);

export default UserLoginForm;

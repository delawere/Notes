import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserInfo from "../molecules/UserInfo";

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dadce0;
`;

const Title = styled.a`
  display: inline-block;
  color: #337ab7;
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  padding: 4px 20px;
  text-decoration: none;
`;

const Header = () => (
  <Container>
    <Title>todos</Title>
    <UserInfo />
  </Container>
);

export default Header;

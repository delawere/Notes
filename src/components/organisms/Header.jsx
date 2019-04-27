import React from "react";
import styled from "styled-components";
import ContactButtons from "../organisms/ContactButtons";
import UserControl from "../molecules/UserControl";
import UserLoginForm from "../molecules/UserLoginForm";

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  border-bottom: 1px solid #dadce0;
`;

const Title = styled.span`
  display: inline-block;
  color: #337ab7;
  font-size: 32px;
  font-weight: 500;
  padding: 4px 20px;
  text-decoration: none;
`;

const Header = ({ userLogged, openForm }) => (
  <Container>
    <Title>note</Title>
    <ContactButtons></ContactButtons>
    {!userLogged ? <UserLoginForm openForm={openForm} /> : <UserControl />}
  </Container>
);

export default Header;

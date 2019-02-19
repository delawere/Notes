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
  background: #fff;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #dadce0;
`;

const Title = styled.p`
  display: inline-block;
  color: #337ab7;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  padding: 4px 20px;
  text-decoration: none;
`;

const Header = ({ userLogged, openForm }) => (
  <Container>
    <Title>todos</Title>
    <ContactButtons></ContactButtons>
    {!userLogged ? <UserLoginForm openForm={openForm} /> : <UserControl />}
  </Container>
);

export default Header;

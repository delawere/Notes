import React from 'react';
import styled from 'styled-components';
import ContactButtons from '../organisms/ContactButtons';
import UserControl from '../molecules/UserControl';
import UserLoginForm from '../molecules/UserLoginForm';

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: hsla(0, 0%, 100%, 0.7);
  background-color: #24292e;
  display: flex;
  padding: 0.5em 0.75em;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

const Header = ({ userLogged, openForm }) => (
  <Container>
    <ContactButtons />
    {!userLogged ? <UserLoginForm openForm={openForm} /> : <UserControl />}
  </Container>
);

export default Header;

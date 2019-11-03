import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  cursor: pointer;
  user-select: none;
  transition: background 120ms ease-in 0s;
  width: auto;
  padding: 4px 10px;
  border-radius: 3px;
  flex-shrink: 0;
  font-size: 15px;
  margin-left: 1em;
  font-weight: 500;
  color: #999;
  border-radius: 0.2em;
  border: ${props => (props.name === 'signup' ? '1px solid #999' : 'none')}
  margin-right: ${props => (props.name === 'signup' ? '1.5em' : '0')}
  transition: 150ms ease-in-out;

  &:hover {
    color: white;
    text-decoration: none;
    border: ${props => (props.name === 'signup' ? '1px solid white' : 'none')}
  }
`;

const UserLoginForm = ({ openForm }) => (
  <div onClick={openForm}>
    <StyledLink name={'login'} to="/login">
      Log in
    </StyledLink>
    <StyledLink name={'signup'} to="/signup">
      Sign up
    </StyledLink>
  </div>
);

UserLoginForm.propTypes = {
  openForm: PropTypes.func
};

export default UserLoginForm;

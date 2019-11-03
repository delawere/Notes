import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  color: #fff;
  display: block;
  margin: 0 auto;
  margin-top: 1.6em;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.4em 1.8em;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const SignUpButton = styled(Button)`
  background-color: #28a745;
  border-color: #28a745;

  &:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

const LogInButton = styled(Button)`
  background-color: #007bff;
  border-color: #007bff;

  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;

const SubmitButton = ({ title, onClick }) => {
  return title === 'Log In' ? (
    <LogInButton onClick={onClick}>{title}</LogInButton>
  ) : (
    <SignUpButton onClick={onClick}>{title}</SignUpButton>
  );
};

SubmitButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default SubmitButton;

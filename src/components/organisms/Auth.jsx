import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from '../atoms/Input';
import LoginFormTitle from '../atoms/LoginFormTitle';
import ErrorPopup from '../molecules/ErrorPopup';
import SubmitButton from '../atoms/SubmitButton';
import RedirectLabel from '../molecules/RedirectLabel';

const Form = styled.form`
  box-sizing: border-box;
  width: 45%;
  margin: 0 auto;
`;

const PasswordRules = styled.p`
  color: #999;
  margin-top: -0.7em;
`;

const inputPropsShape = PropTypes.shape({
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
});

const Auth = ({ name, errorMessage, emailProps, passwordProps, onClick }) => (
  <div>
    <LoginFormTitle name={name} />
    <ErrorPopup errorMessage={errorMessage} />
    <Form>
      <Input {...emailProps} />
      <Input {...passwordProps} />
      <PasswordRules>{passwordProps.rules}</PasswordRules>
      <SubmitButton title={name} onClick={onClick} />
      <RedirectLabel labelTitle={'Already a member?'} linkTitle={'Log In'} />
    </Form>
  </div>
);

Auth.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  emailProps: PropTypes.shape({ inputPropsShape }),
  passwordProps: PropTypes.shape({ inputPropsShape }),
  onClick: PropTypes.func
};

export default Auth;

import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Container = styled.div`
  margin: 0 auto;
  border-radius: 0.5em;
  box-shadow: 0 0 3px #ddd;
  overflow: hidden;
  width: 45%;
  box-sizing: border-box;
`;
const Header = styled.header`
  background-color: #f55;
  padding: 0.4em 0.75em;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.04em;
`;
const Body = styled.div`
  font-size: 1.1rem;
  padding: 0.5em 0.75em;
  font-weight: 400;
`;

const ErrorPopup = ({ errorMessage }) => (
  <Container style={errorMessage ? {} : { display: 'none' }}>
    <Header>Error</Header>
    <Body>{errorMessage}</Body>
  </Container>
);

ErrorPopup.propTypes = {
  errorMessage: propTypes.string
};

export default ErrorPopup;

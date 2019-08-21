import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  border: none;
  width: 1.5em;
  height: 1.5em;
  font-size: 1.5rem;
  padding: 0;
  cursor: pointer;
  margin: auto;
  border-radius: 0.25em;
  transition: 100ms ease-in-out;
  ${props => props.arrowSide === 'right' ? 'transform: rotate(180deg);' : ''} 

  &:hover {
    color: #4facfe;
  }
`;

const Arrow = ({ arrowSide, onClick }) => (
  <Container onClick={onClick} arrowSide={arrowSide}>
    &#8592;
  </Container>
);

Arrow.propTypes = {
  arrowSide: PropTypes.string,
  onClick: PropTypes.func
};

export default Arrow;

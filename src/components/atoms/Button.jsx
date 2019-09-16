import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const bgColors = {
  done: '#0088cc',
  remove: 'tomato',
  now: '#b0b2c3'
};

const ButtonWrapper = styled.button`
  margin: 0 0.1em;
  border: none;
  text-transform: capitalize;
  height: 1.4em;
  line-height: 1;
  border-radius: 0.25em;
  background-color: ${props => bgColors[props.title]};
  color: white;
  font-weight: 500;

  &:hover {
  }
`;

const Button = ({ onClick, taskKey, title }) => (
  <ButtonWrapper onClick={() => onClick(taskKey)} title={title}>
    {title}
  </ButtonWrapper>
);

Button.propTypes = {
  onRemove: PropTypes.func,
  taskKey: PropTypes.string
};

export default Button;

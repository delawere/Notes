import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: 1.75em;
  height: 1.75em;
  border: none;
  outline: none;
  background: transparent;

  &:hover > svg {
    fill: red;
  }
`;

const Svg = styled.svg`
  fill: #b4b4b4;
`;

const DeleteButton = ({ onClick, taskKey, title }) => (
  <Button onClick={() => onClick(taskKey)}>
    <Svg viewBox="0 0 20 20">
      <title>close</title>
      <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z" />
    </Svg>
  </Button>
);

DeleteButton.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string
};

export default DeleteButton;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: 1.75em;
  height: 1.75em;
  border: none;

  &:hover > svg {
    fill: green;
  }
`;

const Svg = styled.svg`
  fill: #b4b4b4;
`;

const CheckButton = ({ onClick, taskKey, title }) => (
  <Button onClick={() => onClick(taskKey)}>
    <Svg id="icon-checkmark" viewBox="0 0 20 20">
      <title>checkmark</title>
      <path d="M0 11l2-2 5 5 11-11 2 2-13 13z" />
    </Svg>
  </Button>
);

CheckButton.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string
};

export default CheckButton;

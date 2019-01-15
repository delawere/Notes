import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SvgDeleteCircle = styled.svg`
  width: 32px;
  heigth: 32px;
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;
  cursor: pointer;

  &:hover {
    fill: #2e2e2e;
  }
`;

const DeleteButton = ({ onRemove, taskKey }) => (
  <SvgDeleteCircle
    onClick={() => onRemove(taskKey)}
    width="20"
    height="20"
    viewBox="0 0 34 34"
  >
    <title>delete</title>
    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z" />
    <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z" />
  </SvgDeleteCircle>
);

DeleteButton.propTypes = {
  onRemove: PropTypes.func,
  taskKey: PropTypes.string
};

export default DeleteButton;

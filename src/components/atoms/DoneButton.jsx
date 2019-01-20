import React from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */

const SvgDoneButton = styled.svg`
  width: 32px;
  heigth: 32px;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;
  cursor: pointer;

  &:hover {
    fill: #2e2e2e;
  }
`;

const DoneButton = ({ moveTaskToDone, taskKey, text }) => (
  <SvgDoneButton
    width="20"
    height="20"
    viewBox="0 0 24 24"
    onClick={() => moveTaskToDone(taskKey, text)}
  >
    <title>check_circle</title>
    <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z" />
  </SvgDoneButton>
);

/* DoneButton.propTypes = {}; */

export default DoneButton;

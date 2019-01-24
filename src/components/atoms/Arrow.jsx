import React from "react";
import styled from "styled-components";
/* import PropTypes from "prop-types"; */

const leftSidePath =
  "M20.928 5.376l-9.504 9.472 9.504 9.504q0.32 0.32 0.32 0.8t-0.32 0.8l-2.976 2.976q-0.352 0.32-0.8 0.32t-0.8-0.32l-13.248-13.28q-0.352-0.32-0.352-0.8t0.352-0.8l13.248-13.248q0.32-0.352 0.8-0.352t0.8 0.352l2.976 2.976q0.32 0.32 0.32 0.8t-0.32 0.8z";
const rightSidePath =
  "M19.776 15.648l-13.248 13.28q-0.352 0.32-0.8 0.32t-0.8-0.32l-2.976-2.976q-0.352-0.352-0.352-0.8t0.352-0.8l9.472-9.504-9.472-9.472q-0.352-0.352-0.352-0.8t0.352-0.8l2.976-2.976q0.32-0.352 0.8-0.352t0.8 0.352l13.248 13.248q0.32 0.352 0.32 0.8t-0.32 0.8z";

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const SvgArrows = styled.svg`
  width: 10px;
  heigth: 10px;
  border-radius: 3px;
  margin-top: 50px;
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #242425;

  &:hover {
    fill: rgba(0, 0, 0, 0.25);
  }
`;

const Arrow = ({ arrowSide, onClick }) => (
  <Container onClick={onClick}>
    <SvgArrows
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <title>left-open</title>
      <path d={arrowSide === "left" ? leftSidePath : rightSidePath} />
    </SvgArrows>
  </Container>
);

export default Arrow;

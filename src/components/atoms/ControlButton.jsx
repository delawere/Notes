import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid transparent;
  letter-spacing: 0.01428571em;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 4px 20px;
  line-height: 1.25rem;
  color: #333;
  cursor: pointer;
  list-style: none;
  margin: 0;
  outline: none;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  background-color: inherit;

  &:hover {
    background-color: #dcdcdc;
  }
`;

const ControlButton = ({ title, action }) => (
  <Button onClick={action}>{title}</Button>
);

export default ControlButton;

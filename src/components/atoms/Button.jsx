import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const bgColors = {
  done: "#0088cc",
  remove: "tomato"
};

const ButtonWrapper = styled.button`
  text-transform: capitalize;
  font-size: 0.8rem;
  padding: 0.25em 1.25em;
  border-radius: 0.25em;
  background-color: ${props => bgColors[props.title]};
  color: white;
  font-weight: 500;
  margin-right: 0.75em;
  border: none;
  outline: none;

  &:hover {
  }
`;

const Button = ({ onRemove, taskKey, title }) => (
  <ButtonWrapper onClick={() => onRemove(taskKey)} title={title}>
    {title}
  </ButtonWrapper>
);

Button.propTypes = {
  onRemove: PropTypes.func,
  taskKey: PropTypes.string
};

export default Button;

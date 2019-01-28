import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  box-sizing: content-box;
  background-color: inherit;
  font-weight: 700;
  font-size: 14px;
  -webkit-text-decoration: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin-bottom: 15px;
  margin-right: 15px;
  padding: 10px 12px;
  border-radius: 5px;
  border: 0;
  -webkit-transition: all 0.15s ease-in-out;
  -webkit-transition: all 0.15s ease-in-out;
  transition: all 0.15s ease-in-out;
  color: #000;
  font-weight: 500;

  border: 1px solid ${props => (props.visible ? "#ec5e69" : "rgba(0,0,0,.15)")};
  cursor: ${props => (props.visible ? "pointer" : "auto")};
`;

const ClosePopupButton = ({ deleteMarkedTasks, visible }) => (
  <Button onClick={deleteMarkedTasks} visible={visible} >
    Remove marked tasks
  </Button>
);

ClosePopupButton.propTypes = {
  closePopup: PropTypes.func
};

export default ClosePopupButton;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button `
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  box-sizing: content-box;
  background-color: #1abc9c;
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  -webkit-text-decoration: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin-bottom: 15px;
  margin-right: 15px;
  margin-left: 15px;
  padding: 10px 40px;
  border-radius: 5px;
  outline: 0!important;
  border: 0;
  -webkit-transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #18ad90;
`
const AddButton = ({ addNewTask }) => (
  <Button onClick = {addNewTask}>
    Add
  </Button>
);

AddButton.propTypes = {
  addNewTask: PropTypes.func
};

export default AddButton;

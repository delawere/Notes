import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: inline-block;
  box-sizing: content-box;
  background-color: #1abc9c;
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  margin-left: 15px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #18ad90;
`;

const AddButton = ({ addNewTask, title }) => (
  <Button onClick={addNewTask}>{title}</Button>
);

AddButton.propTypes = {
  addNewTask: PropTypes.func,
  title: PropTypes.string
};

export default AddButton;

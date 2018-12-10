import React from 'react';
import styled from 'styled-components';

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
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 20px;
  outline: 0!important;
  border: 0;
  -webkit-transition: all 1.5s ease-in-out;
  transition: all 2s ease-in-out;
  cursor: pointer;

  &:hover {
    margin-left: 80%;
    border-radius: 50%;
    padding: 15px;
  }
`

function AddButton() {
  return (
      <Button>
        Add
      </Button>
  );
}

export default AddButton;
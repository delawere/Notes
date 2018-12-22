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

function ClosePopupButton({ closePopup }) {
  return (
      <Button onClick = {closePopup}>
        <svg version="1.1" 
             xmlns="http://www.w3.org/2000/svg" 
             width="32" 
             height="32" 
             viewBox="0 0 32 32">
          <title>cross</title>
          <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
        </svg>
      </Button>
  );
}

export default ClosePopupButton;
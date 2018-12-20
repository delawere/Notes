import React from 'react';
import styled from 'styled-components';


const Container = styled.div `
  padding: 5px 40px;
  margin: 5px 0;
  font-size: 1.2rem;
`

const SvgDeleteCircle = styled.svg `
  width: 20px;
  heigth: 20px;
  border-radius: 3px; 
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;
  cursor: pointer;

  &:hover {
    fill: #9c1c2f;
  }
`



function PopupListItem({ text }) {
  return (
      <Container>
        <span>{text}</span>
        <SvgDeleteCircle version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>cancel-circle</title>
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
          <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
      </SvgDeleteCircle>
      </Container>
  );
}

export default PopupListItem;
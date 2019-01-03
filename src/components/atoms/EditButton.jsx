import React from 'react';
import styled from 'styled-components';

const SvgDeleteCircle = styled.svg `
  width: 32px;
  heigth: 32px;
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;
  cursor: pointer;

  &:hover {
    fill: #2e2e2e;
  }
`

export default () => (
  <SvgDeleteCircle version="1.1" 
                   xmlns="http://www.w3.org/2000/svg" 
                   width="20" 
                   height="20" 
                   viewBox="0 0 20 20">
    <title>edit</title>
    <path d="M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z"></path>
  </SvgDeleteCircle>
);


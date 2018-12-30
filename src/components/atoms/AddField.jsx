import React from 'react';
import styled from 'styled-components';

const Input = styled.input `
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 24px;
    margin-bottom: 15px;
    color: #898989;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: text;
    font-family: 'pt_sansregular',sans-serif;
    font-size: 18px;

    &:focus,
    &:hover {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`

export default ({ name, onChange, value }) => (
  <Input value = {value}
         name = {name}
         onChange = {onChange}>
  </Input>
);


import React from 'react';
import styled from 'styled-components';

const Cell = styled.div `
  display: inline-block;
  width: 60px;
  height: 60px;
  padding: 35px;
  margin: 5px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  background: #4A4A4A;
  position: relative;
  z-index: 100;
  font-size: 26px;
  font-weigth: 400;
  color: #f0f0f0;
`

const otherDayStyle = {
  'color': '#9e9e9e'
};

const ScheduleCell = ({ value, className }) => {
  const { next, prev } = className;
  return (
    <Cell style = {next || prev ? otherDayStyle  : {}}>{value}</Cell>
  )
};

export default ScheduleCell;
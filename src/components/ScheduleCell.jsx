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
  font-size: 26px;
  font-weigth: 400;
  color: #f0f0f0;
`

const Flag = styled.div `
  position: absolute;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  background-color: rgb(31, 161, 24);
  top: 30px;
`

const otherDayStyle = {
  'color': '#9e9e9e'
};

const ScheduleCell = ({ value, className, fullDate, eventClickDay, task }) => {
  const { next, prev } = className;
  return (
    <Cell style = { next || prev ? otherDayStyle  : {} } 
          onClick = {() => eventClickDay({ fullData: task })}>
      <Flag style = { task ? {} : {'visibility':'hidden'}}></Flag>
      {value}
    </Cell>
  )
};


export default ScheduleCell;
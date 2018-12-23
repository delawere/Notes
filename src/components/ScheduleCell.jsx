import React from 'react';
import styled from 'styled-components';

const Cell = styled.div `
  display: inline-block;
  width: 8px;
  height: 8px;
  padding: 13px;
  margin: 0px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  background: #4A4A4A;
  position: relative;
  font-size: 10px;
  font-weigth: 400;
  color: #f0f0f0;
`

const Flag = styled.div `
  position: absolute;
  border-radius: 50%;
  width: 4px; 
  height: 4px;
  background-color: rgb(31,161,24);
  top: 8px;
`

const otherDayStyle = {
  'color': '#9e9e9e'
};

const ScheduleCell = ({ value, className, fullDate, onClickDay, task, taskKey }) => {
  const { next, prev } = className;
  return (
    <Cell style = { next || prev ? otherDayStyle  : {} } 
          onClick = {() => onClickDay({ date: fullDate, task: task ? task : '', taskKey: taskKey })}>
      <Flag style = { task ? {} : {'visibility':'hidden'}}></Flag>
      {value}
    </Cell>
  )
};


export default ScheduleCell;
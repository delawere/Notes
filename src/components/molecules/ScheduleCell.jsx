import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Cell = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  width: calc(14.285% - 2px);
  height: 10vh;
  margin-top: 2px;
  align-items: flex-end;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 1.3rem;
  font-weight: 500;
  color: #242425;
  transition: background-color 300ms;
`;

const Label = styled.span`
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  line-height: 2.5em;
  text-align: center;
  background-color: ${props => props.isActiveDay ? '#3492FF' : ''};
  color: ${props => props.isActiveDay ? '#fff' : ''};
`

const Flag = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: #3492FF;
  top: 15px;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
`;

const putStateToProps = state => {
  return {
    currentDayDate: state.currentDayDate
  };
};

const onClickHandler = (
  coordinates,
  fullDate,
  activeTasks,
  onClickDay,
  taskKey
) => {
  const { x, y, width, height } = coordinates;
  onClickDay({
    date: fullDate,
    activeTasks: activeTasks ? activeTasks : '',
    taskKey: taskKey,
    coordinates: { x: x - width, y: y - height },
    width
  });
};

const ScheduleCell = ({
  value,
  className,
  fullDate,
  onClickDay,
  isActiveDay,
  activeTasks,
  taskKey
}) => {
  const { next, prev } = className;
  return (
    <Cell
      style={{
        color: next || prev ? '#9e9e9e' : '#242425'
      }}
      onClick={e => {
        onClickHandler(
          e.target.getBoundingClientRect(),
          fullDate,
          activeTasks,
          onClickDay,
          taskKey
        );
      }}
    >
      <Flag style={activeTasks && !isActiveDay ? {} : { opacity: '0' }} />
      <Label isActiveDay={isActiveDay}>{value}</Label>
    </Cell>
  );
};

const ScheduleCellWrapper = connect(putStateToProps)(ScheduleCell);

export default ScheduleCellWrapper;

ScheduleCell.propTypes = {
  value: PropTypes.string,
  className: PropTypes.object,
  fullDate: PropTypes.string,
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object,
  taskKey: PropTypes.string
};

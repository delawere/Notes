import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";

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
  border: 1px solid rgba(0, 0, 0, 0.035);
`;

const Flag = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: rgb(31, 161, 24);
  top: 6px;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
`;

const putStateToProps = state => {
  return {
    currentDayDate: state.currentDayDate,
  };
};

const onClickHandler = (
  coordinates,
  fullDate,
  activeTasks,
  onClickDay,
  taskKey
) => {
  const { x, y } = coordinates;
  onClickDay({
    date: fullDate,
    activeTasks: activeTasks ? activeTasks : "",
    taskKey: taskKey,
    coordinates: { x, y }
  });
};

const ScheduleCell = ({
  value,
  className,
  fullDate,
  onClickDay,
  activeTasks,
  taskKey,
  currentDayDate
}) => {
  const { next, prev } = className;
  return (
    <Cell
      style={{
        color: next || prev ? "#9e9e9e" : "#242425",
        "background": moment(currentDayDate).format("MM.DD.YYYY") === fullDate ? "#85C1E9" : ""
      }}
      onClick={e =>
        onClickHandler(
          e.target.getBoundingClientRect(),
          fullDate,
          activeTasks,
          onClickDay,
          taskKey
        )
      }
    >
      <Flag style={activeTasks ? {} : { opacity: "0" }} />
      {value}
    </Cell>
  );
};

const ScheduleCellWrapper = connect(
  putStateToProps
)(ScheduleCell);

export default ScheduleCellWrapper;

ScheduleCell.propTypes = {
  value: PropTypes.string,
  className: PropTypes.object,
  fullDate: PropTypes.string,
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object,
  taskKey: PropTypes.string
};

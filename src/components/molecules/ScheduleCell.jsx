import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Cell = styled.div`
  display: flex;
  width: 14.285%;
  height: 10vh;
  margin: 0px;
  margin-top: 2px;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: #242425;
  border: 1px solid rgba(0, 0, 0, 0.035);
`;

const Flag = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  background-color: rgb(31, 161, 24);
  top: 4px;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
`;

const otherDayStyle = {
  color: "#9e9e9e"
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
  taskKey
}) => {
  const { next, prev } = className;
  return (
    <Cell
      style={next || prev ? otherDayStyle : {}}
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

export default ScheduleCell;

ScheduleCell.propTypes = {
  value: PropTypes.string,
  className: PropTypes.object,
  fullDate: PropTypes.string,
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object,
  taskKey: PropTypes.string
};

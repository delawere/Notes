import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Cell = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  padding: 13px;
  margin: 0px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: #242425;
`;

const Flag = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  background-color: rgb(31, 161, 24);
  top: 8px;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
`;

const otherDayStyle = {
  color: "#9e9e9e"
};

const ScheduleCell = ({
  value,
  className,
  fullDate,
  onClickDay,
  activeTasks,
  doneTasks,
  taskKey
}) => {
  const { next, prev } = className;
  return (
    <Cell
      style={next || prev ? otherDayStyle : {}}
      onClick={() =>
        onClickDay({
          date: fullDate,
          activeTasks: activeTasks ? activeTasks : "",
          doneTasks: doneTasks ? doneTasks : "",
          taskKey: taskKey
        })
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
  doneTasks: PropTypes.object,
  taskKey: PropTypes.string
};

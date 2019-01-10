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
  task,
  taskKey
}) => {
  const { next, prev } = className;
  return (
    <Cell
      style={next || prev ? otherDayStyle : {}}
      onClick={() =>
        onClickDay({ date: fullDate, task: task ? task : "", taskKey: taskKey })
      }
    >
      <Flag style={task ? {} : { opacity: "0" }} />
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
  task: PropTypes.object,
  taskKey: PropTypes.string
};

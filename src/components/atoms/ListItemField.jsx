import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const Label = styled.span`
  display: inline-block;
  margin-left: 55px;
  font-weight: 400;
  text-decoration: ${props => (props.isLineThrought ? "line-through" : "none")};
`;

const CheckBox = styled.input`
  display: inline-block;
  opacity: 0;
  width: 50px;
  height: 100%;
  position: absolute;
  z-index: 999;
`;

const CheckBoxIcon = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
`;

const ListItemField = ({ text, taskKey, addTaskToMarkedGroup, isMarked, isLineThrought }) => (
  <FieldContainer>
    <CheckBox
      type="checkbox"
      id={taskKey}
      onChange={e => addTaskToMarkedGroup({taskKey, text}, e.target.checked)}
    />
    <label htmlFor={taskKey}>
      <CheckBoxIcon
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        hidden={isMarked}
        htmlFor={taskKey}
        focusable="false"
        aria-hidden="true"
      >
        <title>check_box_outline_blank</title>
        <path d="M18.984 3c1.078 0 2.016 0.938 2.016 2.016v13.969c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.938-2.016 2.016-2.016h13.969zM18.984 5.016h-13.969v13.969h13.969v-13.969z" />
      </CheckBoxIcon>

      <CheckBoxIcon
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        hidden={!isMarked}
        htmlFor={taskKey}
        focusable="false"
        aria-hidden="true"
      >
        <title>check_box</title>
        <path d="M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM18.984 3c1.125 0 2.016 0.938 2.016 2.016v13.969c0 1.078-0.891 2.016-2.016 2.016h-13.969c-1.125 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.891-2.016 2.016-2.016h13.969z" />
      </CheckBoxIcon>
    </label>

    <Label isLineThrought={isLineThrought}>{text}</Label>
  </FieldContainer>
);

ListItemField.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  addTaskToMarkedGroup: PropTypes.func,
  isMarked: PropTypes.bool
};

export default ListItemField;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldContainer = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  display: inline-block;
  margin-left: 25px;
  font-weight: 400;
`;

const Input = styled.input`
  display: inline-block;
`;

const ListItemField = ({ text, taskKey, addTaskToRemoveGroup }) => (
  <FieldContainer>
    <Input
      type="checkbox"
      id={taskKey}
      onChange={e => addTaskToRemoveGroup(taskKey, e.target.checked)}
    />
    <Label htmlFor={taskKey}>{text}</Label>
  </FieldContainer>
);

ListItemField.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  addTaskToRemoveGroup: PropTypes.func
};

export default ListItemField;

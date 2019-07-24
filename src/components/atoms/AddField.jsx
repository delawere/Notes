import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const enterCharCode = 13;

const Container = styled.div`
  position: relative;
  padding: 1em 0 1em;
  flex: 1;
  display: flex;
`;

const Input = styled.input`
    display: inline-block;
    width: 100%;
    align-self: flex-end;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: text;
    font-family: 'pt_sansregular',sans-serif;
    font-size: 0.9rem;

    &:focus,
    &:hover {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`;

const AddField = ({
  name,
  onChange,
  value,
  addNewTask,
  onFocusAddField,
  placeholder
}) => (
  <Container>
    <Input
      id="fullname"
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocusAddField}
      onBlur={onFocusAddField}
      onKeyPress={event =>
        event.charCode === enterCharCode ? addNewTask() : null
      }
    />
  </Container>
);

AddField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  addNewTask: PropTypes.func
};

export default AddField;

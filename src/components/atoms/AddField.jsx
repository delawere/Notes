import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const enterCharCode = 13;

const Container = styled.div`
  position: relative;
  padding: 0.5em;
  margin: 0;
  flex: 1;
  display: flex;
`;

const Input = styled.input`
    display: inline-block;
    width: 100%;
    align-self: flex-end;
    padding: 0.5rem;
    border: none;
    cursor: text;
    font-family: 'pt_sansregular',sans-serif;
    font-size: 1rem;
    transition: 150ms ease-in-out;

    &:focus {
      outline: none;
      border-radius: 0.3em;
      background-color: #e9ecef;
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

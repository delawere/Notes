import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const enterCharCode = 13;

const Container = styled.div`
  position: relative;
  min-height: 85px;
  flex: 1;
  display: flex;
`;

const Input = styled.input`
    display: inline-block;
    width: 100%;
    align-self: flex-end;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 24px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: text;
    font-family: 'pt_sansregular',sans-serif;
    font-size: 18px;

    &:focus,
    &:hover {
      border-color: #66afe9;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
`;

/* const Placeholder = styled.label`
  display: inline-block;
  position: absolute;
  top: 55%;x
  left: 4%;
  transition: 600ms ease-out;
  font-weight: 500;

  top: ${props => (props.inFocus ? "5%" : "55%")};
  left: ${props => (props.inFocus ? "2%" : "4%")};
  font-size: ${props => (props.inFocus ? "13px;" : "17px")};
  color: ${props => (props.inFocus ? "#4F4F4F" : "rgba(222, 222, 222, 1)")};
`;
 */
const AddField = ({
  name,
  onChange,
  value,
  addNewTask,
  onFocusAddField,
  placeholder
}) => (
  <Container>
    {/*   <Placeholder inFocus={inFocus} for="fullname">
      Enter what you want to do
    </Placeholder> */}
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

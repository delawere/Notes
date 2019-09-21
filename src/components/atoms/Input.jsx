import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputText = styled.input`
  outline: none;
  display: block;
  width: 100%;
  height: 2.3em;
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :focus {
    border-color: #0062cc;
    box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
  }
`;

const Input = ({ type, name, value, onChange, placeholder }) => (
  <InputText
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default Input;

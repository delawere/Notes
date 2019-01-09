import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";

const Input = ({ type, name, value, onChange, className, placeholder }) => (
  <div className="form-group row">
    <div className="col-10 center-block">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RadioButton = ({ categoryName }) => (
  <div>
    <input type="checkbox" id={categoryName} name="scales"/>
    <label for={categoryName}>{categoryName}</label>
  </div>
);

RadioButton.propTypes = {
  categoryName: PropTypes.string
};

export default RadioButton;

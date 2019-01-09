import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import RadioButton from "../atoms/RadioButton";

class RadioGroup extends Component {

  static Categories = ["Work", "Family", "Hobbies&Others"];

  render() {
    return (
      <div>
        <h4>Choose task's category:</h4>
        {RadioGroup.Categories.map(category => 
          <RadioButton categoryName={category} />
        )}
      </div>
    );
  }
}

RadioGroup.propTypes = {};

export default RadioGroup;

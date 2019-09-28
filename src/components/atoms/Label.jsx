import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ title }) => <span>{title}</span>;

Label.propTypes = {
  title: PropTypes.string
};

export default Label;

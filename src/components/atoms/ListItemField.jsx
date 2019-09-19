import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.span`
  display: inline-block;
  color: ${props => (props.checked ? '#b4b4b4' : '#000')};
`;

const ListItemField = ({ text, checked }) => (
  <Label checked={checked}>{text}</Label>
);

ListItemField.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool
};

export default ListItemField;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.span`
  display: inline-block;
  font-weight: 400;
  text-decoration: ${props => (props.isLineThrought ? 'line-through' : 'none')};
`;

const ListItemField = ({ text }) => <Label>{text}</Label>;

ListItemField.propTypes = {
  text: PropTypes.string
};

export default ListItemField;

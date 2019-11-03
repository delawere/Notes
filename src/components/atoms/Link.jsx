import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LinkWrapper = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const Link = ({ title }) => <LinkWrapper>{title}</LinkWrapper>;

Link.propTypes = {
  title: PropTypes.string
};

export default Link;

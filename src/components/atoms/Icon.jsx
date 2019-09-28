import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import IconPaths from './IconPaths';
import IconViewBoxes from './IconViewBoxes';

const SVG = styled.svg`
  width: 1em;
  height: 1em;
  fill: inherit;
  margin-right: 0.7em;
  margin-bottom: -0.2em;
`;

const Icon = ({ name }) => (
  <SVG viewBox={IconViewBoxes[name]}>
    <title>{name}</title>
    <path d={IconPaths[name]} />
  </SVG>
);

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;

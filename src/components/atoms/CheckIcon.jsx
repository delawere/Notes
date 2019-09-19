import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckIconPath =
  'M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z';

const SVG = styled.svg`
  margin-right: 0.5em;
  width: 1em;
  height: 1em;
  fill: #b4b4b4;
  transition: fill 200ms ease-in-out;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

const CheckIcon = ({ visible }) => (
  <SVG viewBox="0 0 24 24" visible={visible}>
    <title>check</title>
    <path d={CheckIconPath} />
  </SVG>
);

CheckIcon.propTypes = {
  visible: PropTypes.bool
};

export default CheckIcon;

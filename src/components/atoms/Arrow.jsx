import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArrowLeftPath = 'M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z';
const ArrowRightPath = 'M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z';

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  width: 1.2em;
  height: 1.2em;
  padding: 0;
  cursor: pointer;
  margin: auto;
  border-radius: 0.25em;
  transition: 100ms ease-in-out;

  &:hover > svg {
    fill: #4facfe;
  }
`;

const SVG = styled.svg`
  fill: #000;
  transition: fill 200ms ease-in-out;
`

const Arrow = ({ arrowSide, onClick }) => (
  <Button onClick={onClick} arrowSide={arrowSide}>
    <SVG viewBox="0 0 32 32">
      <title>arrow-right2</title>
      <path d={arrowSide === 'left' ? ArrowLeftPath : ArrowRightPath}></path>
    </SVG>
  </Button>
);

Arrow.propTypes = {
  arrowSide: PropTypes.string,
  onClick: PropTypes.func
};

export default Arrow;


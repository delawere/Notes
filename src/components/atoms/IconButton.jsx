import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const hoverStyles = 'background: #d3d3d3; border: 1px solid #b4b4b4;';

const Button = styled.button`
  width: 1.55em;
  height: 1.55em;
  margin: 0;
  padding: 0.15em 0;
  border: none;
  outline: none;
  transition: 200ms ease-in-out;
  border: 1px solid transparent;
  border-radius: 0.25em;

  &:hover {
    ${hoverStyles}
  }
`;

const Svg = styled.svg`
  width: 1em;
  height: 1.25em;
  fill: rgba(55, 53, 47, 0.4);
`;

const Paths = {
  delete:
    'M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z',
  edit:
    'M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z',
  menu:
    'M14 12c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 5c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z'
};

const IconButton = ({ onClick, taskKey, taskText, buttonType }) => (
  <Button
    menuOpened={true}
    onClick={event => {
      event.stopPropagation();

      const target = event.currentTarget;
      onClick(target.offsetLeft, target.offsetTop, taskKey, taskText);
    }}
  >
    <Svg viewBox="0 0 23 27">
      <title>close</title>
      <path d={Paths[buttonType]} />
    </Svg>
  </Button>
);

IconButton.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string
};

export default IconButton;

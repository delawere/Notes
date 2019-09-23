import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: 1.75em;
  height: 1.75em;
  border: none;
  outline: none;
  background: transparent;

  &:hover > svg {
    fill: red;
  }
`;

const Svg = styled.svg`
  fill: #b4b4b4;
`;

const Paths = {
  delete:
    'M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z',
  edit:
    'M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z',
  menu:
    'M14 12c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 5c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414zM14 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z'
};

const DeleteButton = ({ onClick, taskKey, buttonType }) => (
  <Button
    onClick={event => {
      event.stopPropagation();
      onClick(taskKey);
    }}
  >
    <Svg viewBox="0 0 20 20">
      <title>close</title>
      <path d={Paths[buttonType]} />
    </Svg>
  </Button>
);

DeleteButton.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string
};

export default DeleteButton;

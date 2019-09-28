import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Label from '../atoms/Label';
import Icon from '../atoms/Icon';

const Container = styled.li`
  cursor: pointer;
  padding: 0.2em 0.6em;
  transition: 100ms ease-in;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const PopupItem = ({ title, onClick, taskId }) => {
  return (
    <Container onClick={() => onClick(taskId, title)}>
      <Icon name={title.toLowerCase()} />
      <Label title={title} />
    </Container>
  );
};

PopupItem.propTypes = {
  title: propTypes.string,
  onClick: propTypes.func
};

export default PopupItem;

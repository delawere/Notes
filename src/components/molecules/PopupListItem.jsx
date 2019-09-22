import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckIcon from '../atoms/CheckIcon';

import ListItemField from '../atoms/ListItemField';
import DeleteButton from '../atoms/DeleteButton';

const Container = styled.div`
  padding: 0.25em 1em;
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  color: #b4b4b4;
  cursor: pointer;
`;

const ControlButtons = styled.div`
  margin-left: auto;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
`;

const PopupListItem = ({
  text,
  taskKey,
  type,
  date,
  onRemove,
  changeTaskType
}) => {
  const isDone = type === 'done' ? true : false;
  return (
    <Container
      onClick={() => changeTaskType({ id: taskKey, task: text, date, type })}
    >
      <CheckIcon visible={isDone} />
      <ListItemField text={text} checked={isDone} />
      <ControlButtons>
        <DeleteButton onClick={onRemove} taskKey={taskKey} />
      </ControlButtons>
    </Container>
  );
};

PopupListItem.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  onRemove: PropTypes.func,
  changeTaskType: PropTypes.func
};

export default PopupListItem;



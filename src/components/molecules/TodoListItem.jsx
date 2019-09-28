import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckIcon from '../atoms/CheckIcon';

import ListItemField from '../atoms/ListItemField';
import IconButton from '../atoms/IconButton';

const Container = styled.div`
  padding: 0.25em 1em;
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  color: #b4b4b4;
  cursor: pointer;
  margin: 0.5em 0;
`;

const ControlButtons = styled.div`
  margin-left: auto;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
`;

const TodoListItem = ({
  text,
  taskKey,
  type,
  date,
  onPopupButtonClick,
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
        <IconButton onClick={onPopupButtonClick} taskKey={taskKey} taskText = {text} buttonType={'menu'}/>
      </ControlButtons>
    </Container>
  );
};

TodoListItem.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  type: PropTypes.string,
  date: PropTypes.string,
  onRemove: PropTypes.func,
  changeTaskType: PropTypes.func
};

export default TodoListItem;


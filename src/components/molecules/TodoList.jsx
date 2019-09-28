import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';

import AddForm from './AddForm';

const Container = styled.div``;

const TodoList = ({
  tasksList,
  onPopupButtonClick,
  changeTaskType,
  currentDate,
  refreshDataSet
}) => (
  <Container>
    {tasksList.map(({ text, key, type }) => (
      <TodoListItem
        text={text}
        key={key}
        taskKey={key}
        type={type}
        date={currentDate}
        onPopupButtonClick={onPopupButtonClick}
        changeTaskType={changeTaskType}
      />
    ))}
    <AddForm date={currentDate} refreshDataSet={refreshDataSet} />
  </Container>
);

TodoList.propTypes = {
  tasksList: PropTypes.array,
  onRemove: PropTypes.func,
  addTaskToMarkedGroup: PropTypes.func,
  currentDate: PropTypes.string,
  refreshDataSet: PropTypes.func
};

export default TodoList;

import React from 'react';
import PropTypes from 'prop-types';
import PopupListItem from '../molecules/PopupListItem';
import styled from "styled-components";

const Fieldset = styled.fieldset`
  padding-top: 0.5em;
  padding-left: 0.5em;
`
const NoTasksTitle = styled.span`
  font-style: italic;
  color: #b4b4b4;
`;
const PopupList = ({ tasksList, onRemove, addTaskToMarkedGroup }) => (
  <Fieldset>
    <NoTasksTitle>{tasksList.length > 0 ? '' : 'no tasks to do'}</NoTasksTitle>
    {tasksList.map(({ text, key }) => (
      <PopupListItem
        text={text}
        key={key}
        taskKey={key}
        onRemove={onRemove || ''}
        addTaskToMarkedGroup={addTaskToMarkedGroup || ''}
      />
    ))}
  </Fieldset>
);

PopupList.propTypes = {
  title: PropTypes.string,
  tasksList: PropTypes.array,
  onRemove: PropTypes.func,
  addTaskToMarkedGroup: PropTypes.func
};

export default PopupList;

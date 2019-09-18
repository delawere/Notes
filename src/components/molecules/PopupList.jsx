import React from 'react';
import PropTypes from 'prop-types';
import PopupListItem from '../molecules/PopupListItem';
import styled from 'styled-components';

import AddForm from '../molecules/AddForm';

const Container = styled.div`
  padding-left: 1em;
  padding-top: 0.75em;
`;

const PopupList = ({
  tasksList,
  onRemove,
  addTaskToMarkedGroup,
  currentDate,
  refreshDataSet
}) => (
  <Container>
    {tasksList.map(({ text, key }) => (
      <PopupListItem
        text={text}
        key={key}
        taskKey={key}
        onRemove={onRemove || ''}
        addTaskToMarkedGroup={addTaskToMarkedGroup || ''}
      />
    ))}
    <AddForm date={currentDate} refreshDataSet={refreshDataSet} />
  </Container>
);

PopupList.propTypes = {
  tasksList: PropTypes.array,
  onRemove: PropTypes.func,
  addTaskToMarkedGroup: PropTypes.func,
  currentDate: PropTypes.string,
  refreshDataSet: PropTypes.func
};

export default PopupList;

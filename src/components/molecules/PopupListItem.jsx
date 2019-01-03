import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import EditButton from '../atoms/EditButton';
import DeleteButton from '../atoms/DeleteButton';


const Container = styled.div `
  padding: 10px 40px;
  margin: 5px 0;
  font-size: 1.2rem;
  display: flex;
  width: 90%;
  justify-content: space-between;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  cursor: pointer;
`

const ControlButtons = styled.div `
  display: flex;
  justify-content: space-between;
  width: 70px;
` 

const PopupListItem = ({ text, taskKey, onRemove }) => (
  <Container>
    <span>{text}</span>
    <ControlButtons>
      <EditButton />
      <DeleteButton onRemove = {onRemove} 
                    taskKey = {taskKey}/>
    </ControlButtons>
  </Container>
);

export default PopupListItem;

PopupListItem.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  onRemove: PropTypes.func
};

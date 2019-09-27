import React from 'react';
import styled from 'styled-components';
import PopupItem from '../molecules/PopupItem';

const Container = styled.div`
  display: ${props => (props.visible ? '' : 'none')};
  margin: 0;
  padding: 0.5em 3em 0.5em 0.25em;
  box-sizing: border-box;
  width: 10em;
  border-radius: 0.25em;
  background: white;
  position: absolute;
  left: calc(${props => props.x}px - 82.5px + 13.15px) ;
  top: ${props => props.y}px;
  font-size: 1.1rem;
  color: rgb(55, 53, 47);
  fill: rgb(55, 53, 47);
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 1em;
  list-style-type: none;
`;

const Popup = ({ items, actions, visible, popupX, popupY }) => {
  return (
    <Container visible={visible} x={popupX} y={popupY}>
      <List>
        {items.map((it, i) => (
          <PopupItem key={i} title={it} onClick={actions[it.toLowerCase()]} />
        ))}
      </List>
    </Container>
  );
};

Popup.propTypes = {};

export default Popup;

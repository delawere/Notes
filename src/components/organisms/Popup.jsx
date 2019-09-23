import React from 'react';
import styled from 'styled-components';
import PopupItem from '../molecules/PopupItem';

const Container = styled.div`
  margin: 0;
  padding: 0;
  border-radius: 0.25em;
  background: white;
  position: relative;
  max-width: 8.5em;
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

const Popup = ({ items, actions }) => {
  return (
    <Container>
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

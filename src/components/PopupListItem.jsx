import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  padding: 5px 40px;
  margin: 5px 0;
  font-size: 1.2rem;
`

function PopupListItem({ text }) {
  return (
      <Container>
        <span>{text}</span>
      </Container>
  );
}

export default PopupListItem;
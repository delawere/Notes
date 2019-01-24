import React from "react";
import styled from "styled-components";

const List = styled.ul`
  padding: 0;
  list-style: none;
  text-align: center;
  padding-top: 22px;
`;
const Item = styled.li`
  display: inline;
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
`;

const ShowListControls = () => (
  <List>
    <Item>
      <a>All</a>
    </Item>
    <Item>
      <a>Active</a>
    </Item>
    <Item>
      <a>Done</a>
    </Item>
  </List>
);

export default ShowListControls;

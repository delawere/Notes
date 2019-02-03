import React from "react";
import styled from "styled-components";
import ControlButton from "../atoms/ControlButton";

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  left: 864px;
  top: 60px;
  border-width: 0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 4px;
  position: absolute;
  border-radius: 0;
  transition: opacity 0.118s;
  background: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: default;
  font-size: 13px;
  margin: 0;
  outline: none;
  padding: 6px 0;
  position: absolute;
  opacity: ${props => (props.visible ? "1" : "0")};
`;

const Menu = ({ visible, deleteMarkedTasks }) => (
  <Container visible={visible}>
    <ControlButton title={"Remove"} action={deleteMarkedTasks} />
  </Container>
);

export default Menu;

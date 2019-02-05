import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 999;
`;

const SVG = styled.svg`
  width: 24px;
  height: 24px;
`;

const MenuButton = () => (
  <Container>
    <SVG id="icon-menu" viewBox="0 0 24 24">
      <title>menu</title>
      <path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z" />
    </SVG>
  </Container>
);

export default MenuButton;

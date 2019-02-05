import React from "react";
import styled from "styled-components";

const Title = styled.p`
  font-size: 62px;
  font-weight: 700;
  margin-top: 20vh;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.1;
`;

const LoginFormTitle = ({ name }) => (
  <div>
    <Title>{name}</Title>
  </div>
);

export default LoginFormTitle;

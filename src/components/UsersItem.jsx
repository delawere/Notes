import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

import person from '../person.svg';

const Wrapper = styled.div `
  width: 225px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  text-align: left;
  vertical-align: middle;
  padding: 1em;
  margin-bottom: 0.5em;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`

const ImageContainer = styled.div `
  display: inline-block;
  width: 20%;
`
const TitleContainer = styled.div `
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 80%;
  font-weight: bold;
`

const Image = styled.img `
  width: 40px;
  heigth: 40px;
  background-color: rgba(217, 217, 217, 0.35);
  border-radius: 3px; 
`

export default function UsersItem({ name }) {
  return(
    <Wrapper>
      <ImageContainer>
        <Image src={person} alt=""/>
      </ImageContainer>
      <TitleContainer>
        <span>
          {name}
        </span>
      </TitleContainer>
    </Wrapper>
  );
} 
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as Moment from 'moment';

const Table = styled.fieldset `
  display: inline-block;
  width: 5vw;
  height: 100%;
`

const TitleCont = styled.legend `
  text-align: center;
`

const Title = styled.span `
  font-weight: bold;
  font-size: 18px;
`

const Container = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-betweenl

`

const Cell = styled.div `
  width: 25px;
  height: 25px;
  display: inline-block;
`

class ScheduleColumn extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Cell>{this.props.dayInWeek}</Cell>
      </Container>
     
    )
  }
};

export default ScheduleColumn;
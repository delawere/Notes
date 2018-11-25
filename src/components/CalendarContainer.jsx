import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as Moment from 'moment';

import ScheduleCell from './ScheduleCell';

const Container = styled.div `
  width: 600px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const ContainerRow = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const arr = [];
arr.length = 4;

class CalendarContainer extends PureComponent {
  constructor(props) {
    super(props);
  }
  /* Переписать */
  render() {
    return (
      <Container>
        
        <ContainerRow>
          {this.props.days.slice(7, 14).map(day => {
            return <ScheduleCell day = {day.dayInMonth} />
          })}
        </ContainerRow>
        <ContainerRow>
          {this.props.days.slice(14, 21).map(day => {
            return <ScheduleCell day = {day.dayInMonth} />
          })}
        </ContainerRow>
        <ContainerRow>
          {this.props.days.slice(21, 28).map(day => {
            return <ScheduleCell day = {day.dayInMonth} />
          })}
        </ContainerRow>
        <ContainerRow>
          {this.props.days.slice(28, 31).map(day => {
            return <ScheduleCell day = {day.dayInMonth} />
          })}
        </ContainerRow>
      </Container>
    )
  }
};

export default CalendarContainer;
import React, { PureComponent } from 'react';
import styled from 'styled-components';

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

const TimeButton = styled.button `
  border: 1px solid rgba(207, 207, 207, 0.79);
  background-color: #fff;
  display: block;
  width: 100%;
  border-radius: 3px;
  margin-bottom: 7px;
`

class ScheduleColumn extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <Table>
        <TitleCont>
          <Title>{this.props.day}</Title> 
          <Title>{this.props.date}</Title> 
        </TitleCont>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
        <TimeButton>00:00</TimeButton>
      </Table>
    )
  }
};

export default ScheduleColumn;
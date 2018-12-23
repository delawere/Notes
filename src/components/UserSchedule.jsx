import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

import CalendarContainer from './CalendarContainer';


const Wrapper = styled.div `
  z-index: 200;
  margin: auto;
  position: relative;
  width: 80%;
  height: 250px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  justify-content: space-around;
  padding: 20px;
  padding-top: 75px;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  background: #4A4A4A;
`

const ContainerLeftArrow = styled.div `
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 5px;
  cursor: pointer;
`

const SvgArrows = styled.svg `
  width: 10px;
  heigth: 10px;
  border-radius: 3px; 
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;

  &:hover {
    fill: #fff;
  }
`

const ContainerRightArrow = styled.div `
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 5px;
  cursor: pointer;
`

const Title = styled.h2 `
  position: absolute;
  top: 15px;
  color: #f0f0f0;
  font-size: 15px;
`

const WeekDayContainer = styled.div `
  width: 200px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  color: #f0f0f0;
  font-size: 12px;
  font-weight: 400;
`

class UserSchedule extends PureComponent {

  static days = [
    'Monday',
    'Thuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      month: moment().format('MM-DD-YYYY'),

    };
  }

  componentDidUpdate () {
    this.setState({
      visible: true
    });
  }

  closeWindow = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  prevMonth = () => {
    const currentMonth = this.state.month;
    this.setState({
      month: moment(currentMonth).subtract(1, 'month').format('MM-DD-YYYY')
    }) 
  }

  nextMonth = () => {
    const currentMonth = this.state.month;
    this.setState({
      month: moment(currentMonth).add(1, 'month').format('MM-DD-YYYY')
    }); 
  }

  render() {
    return(
      <Wrapper>
        
        <ContainerLeftArrow onClick={this.prevMonth}>
          <SvgArrows version="1.1" 
                     xmlns="http://www.w3.org/2000/svg"   
                     width="32" 
                     height="32" 
                     viewBox="0 0 32 32">
            <title>left-open</title>
            <path d="M20.928 5.376l-9.504 9.472 9.504 9.504q0.32 0.32 0.32 0.8t-0.32 0.8l-2.976 2.976q-0.352 0.32-0.8 0.32t-0.8-0.32l-13.248-13.28q-0.352-0.32-0.352-0.8t0.352-0.8l13.248-13.248q0.32-0.352 0.8-0.352t0.8 0.352l2.976 2.976q0.32 0.32 0.32 0.8t-0.32 0.8z"></path>
          </SvgArrows>
        </ContainerLeftArrow>
        <Title>{moment(this.state.month).format('MMMM YYYY')}</Title>
        <WeekDayContainer>
          {UserSchedule.days.map(weekday => {
            return <div key={weekday}>{weekday[0]}</div>
          })}
        </WeekDayContainer>
        <CalendarContainer date = {moment(this.state.month)}  
                           onClickDay = {this.props.onClickDay} 
                           usersData = {this.props.usersData} />
        <ContainerRightArrow onClick={this.nextMonth}>
          <SvgArrows version="1.1" 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="32" 
                     height="32" 
                     viewBox="0 0 32 32">
            <title>right-open</title>
            <path d="M19.776 15.648l-13.248 13.28q-0.352 0.32-0.8 0.32t-0.8-0.32l-2.976-2.976q-0.352-0.352-0.352-0.8t0.352-0.8l9.472-9.504-9.472-9.472q-0.352-0.352-0.352-0.8t0.352-0.8l2.976-2.976q0.32-0.352 0.8-0.352t0.8 0.352l13.248 13.248q0.32 0.352 0.32 0.8t-0.32 0.8z"></path>
          </SvgArrows>
        </ContainerRightArrow>

      </Wrapper>
    )
  }
}

export default UserSchedule;
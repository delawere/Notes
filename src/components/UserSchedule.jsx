import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

import CalendarContainer from './CalendarContainer';

const Wrapper = styled.div `
  z-index: 200;
  position: fixed;
  margin: auto;
  width: 35vw;
  height: 650px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-around;
  border: 1px solid #000;
  padding: 20px;
  padding-top: 75px;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  background: #4A4A4A;
`

const ImageContainer = styled.div `
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`

const SVG = styled.svg `
  width: 20px;
  heigth: 20px;
  border-radius: 3px; 
  background-color: inherit;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;
  fill: #dbdbdb;

  &:hover {
    fill: #d91c1c;
  }
`

const ContainerLeftArrow = styled.div `
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 10px;
  cursor: pointer;
`

const SVG_Arrows = styled.svg `
  width: 20px;
  heigth: 20px;
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
  right: 10px;
  cursor: pointer;
`

const Title = styled.h2 `
  position: absolute;
  top: 15px;
  color: #f0f0f0;
`

const WeekDayContainer = styled.div `
  width: 600px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  color: #f0f0f0;
  font-weight: 400;
`

class UserSchedule extends PureComponent {

  static days = [
    'Monday',
    'Tuesday',
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
      month: moment().format('MM-DD-YYYY')
    };
  }

  componentDidUpdate (prevProps) {
    if (this.props.visible === prevProps.visible) {
      return;
    };

    this.setState({
      visible: !this.state.visible
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
      <Wrapper style={{'opacity': this.state.visible ? '0.98' : '0'}}>

        <ContainerLeftArrow onClick={this.prevMonth}>
          <SVG_Arrows version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>left-open</title>
            <path d="M20.928 5.376l-9.504 9.472 9.504 9.504q0.32 0.32 0.32 0.8t-0.32 0.8l-2.976 2.976q-0.352 0.32-0.8 0.32t-0.8-0.32l-13.248-13.28q-0.352-0.32-0.352-0.8t0.352-0.8l13.248-13.248q0.32-0.352 0.8-0.352t0.8 0.352l2.976 2.976q0.32 0.32 0.32 0.8t-0.32 0.8z"></path>
          </SVG_Arrows>
        </ContainerLeftArrow>
        <Title>{moment(this.state.month).format('MMMM YYYY')}</Title>
        <WeekDayContainer>
          {UserSchedule.days.map(weekday => {
            return <div>{weekday}</div>
          })}
        </WeekDayContainer>
        <CalendarContainer date = {moment(this.state.month)} />
        <ContainerRightArrow onClick={this.nextMonth}>
          <SVG_Arrows version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>right-open</title>
            <path d="M19.776 15.648l-13.248 13.28q-0.352 0.32-0.8 0.32t-0.8-0.32l-2.976-2.976q-0.352-0.352-0.352-0.8t0.352-0.8l9.472-9.504-9.472-9.472q-0.352-0.352-0.352-0.8t0.352-0.8l2.976-2.976q0.32-0.352 0.8-0.352t0.8 0.352l13.248 13.248q0.32 0.352 0.32 0.8t-0.32 0.8z"></path>
          </SVG_Arrows>
        </ContainerRightArrow>
        <ImageContainer onClick={this.closeWindow}>
          <SVG version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>Close</title>
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
          </SVG>
        </ImageContainer>
      </Wrapper>
    )
  }
}

export default UserSchedule;
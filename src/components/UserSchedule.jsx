import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as Moment from 'moment';

import ScheduleColumn from './ScheduleColumn';

const Wrapper = styled.div `
  z-index: 200;
  position: fixed;
  display: flex;
  margin: auto;
  width: 50vw;
  height: 650px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-around;
  border: 1px solid #000;
  padding: 20px;
  padding-top: 50px;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
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
  background-color: #fff;
  transition-property: fill;
  transition-duration: 0.15s;
  transition-timing-function: ease-out;

  &:hover {
    fill: #d91c1c;
  }
`

const day = {
  to: '',
  from: '',
  date: ''
}

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
      Monday: day,
      Tuesday: day,
      Wednesday: day,
      Thursday: day,
      Friday: day,
      Saturday: day,
      Sunday: day
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

  componentDidMount () {
    const dates = this.getDates();
    this.setState(
      dates
    , () => console.log(this.state));
  }

  closeWindow = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  getDates = () => {
    const dates = {};
    const currentDayinWeek = Moment().weekday() - 1;
    const beginWeekDay = Moment().subtract(currentDayinWeek, 'day').format('DD MMMM YYYY');
    UserSchedule.days.forEach((it, i) => {
      dates[it] = {
        to: '',
        from: '',
        date: ''
      };
      dates[it].date = Moment(beginWeekDay).add(i, 'day').format('DD MMMM YYYY')
    });

    return dates;
  }

  render() {
    return(
      <Wrapper style={{'opacity': this.state.visible ? '1' : '0'}}>
        {UserSchedule.days.map(day => (
          <ScheduleColumn day={day}
                          date={this.state.Monday.date}
          />
        ))}
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
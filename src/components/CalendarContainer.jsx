import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment-range';

import ScheduleCell from './ScheduleCell';

const Container = styled.div `
  width: 600px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

class CalendarContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      days: this.getDays()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.date === this.props.date) {
      return;
    };
    this.setState({
      days: this.getDays()
    })
  }

  getDays() {
    const { date } = this.props;
    const now = date ? date : moment();
    var start = now
      .clone()
      .startOf('month')
      .weekday(1);
    const end = now
      .clone()
      .endOf('month')
      .weekday(7);
    const month = now.month();
    const currDay = now.date();
    const year = now.year();
    let days = [];

    for (; start < end; start.add('day', 1).clone()) {
      days.push({
        fullDate: start.format('MM.DD.YYYY'),
        label: start.format('D'),
        prev: (start.month() < month && !(start.year() > year)) || start.year() < year,
        next: start.month() > month || start.year() > year,
        curr: start.date() === currDay && start.month() === month,
        today:
        start.date() === start.date() &&
        start.month() === start.month() &&
        start.year() === start.year()
      });
    }

    return days 
  }

  render() {
    return (
      <Container>
       {this.state.days.map(day => {
          return <ScheduleCell value = {day.label}
                               className = {{
                                 'prev': day.prev,
                                 'next': day.next,
                                 'curr': day.curr,
                                 'today': day.today
                               }}
                               fullDate = {day.fullDate}
                               eventClickDay = {this.props.eventClickDay}
                
                />
        })}
      </Container>
    )
  }
}

export default CalendarContainer;
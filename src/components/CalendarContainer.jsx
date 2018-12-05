import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment-range';

import ScheduleCell from './ScheduleCell';
import fire from '../config/Fire';

const Container = styled.div `
  width: 600px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const database = fire.database();

const userId = localStorage.getItem('user');

class CalendarContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
      tasks: []
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

  async componentDidMount () {
    const tasks = await this.getTasks();
    const days = this.getDays();
    const data = [];

    for (let key in tasks) {
      data.push({
        date: moment(key).format('MM.DD.YYYY'),
        task: tasks[key]
      });
    };

    this.setState({
      days: days,
      tasks: data
    });

  }

  async getTasks() {
    let result = {};
    const tasks = database.ref(`users/${userId}/tasks`).once('value', snap => {
      result = snap.val() || {};
    });
    await tasks;

    return result
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
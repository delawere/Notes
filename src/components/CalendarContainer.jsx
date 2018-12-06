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
      days: []
    }
  }

  async componentDidUpdate (prevProps) {
    if (prevProps.date === this.props.date) {
      return;
    };

    const days = await this.getDays();

    this.setState({
      days: days
    })
  }

  async componentDidMount () {
    const days = await this.getDays();

    this.setState({
      days: days
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


  async getDays() {
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

    let data = [];

    const tasks = await this.getTasks();
    for (let key in tasks) {
      data.push({
        date: moment(key).format('MM.DD.YYYY'),
        desc: tasks[key]
      });
    };

    for (; start < end; start.add('day', 1).clone()) {
      const currentDay = {};

      data.forEach(task => {
        if (start.format('MM.DD.YYYY') === task.date) {
          currentDay.task = task.desc;
        } 
      }); 

      currentDay.fullDate = start.format('MM.DD.YYYY'),
      currentDay.label = start.format('D'),
      currentDay.prev = (start.month() < month && !(start.year() > year)) || start.year() < year,
      currentDay.next = start.month() > month || start.year() > year,
      currentDay.curr = start.date() === currDay && start.month() === month,
      currentDay.today = 
            start.date() === start.date() &&
            start.month() === start.month() &&
            start.year() === start.year()

      days.push(currentDay);
    };
    console.log(days);
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
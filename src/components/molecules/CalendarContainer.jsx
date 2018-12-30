import React, { PureComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment-range';

import ScheduleCell from './ScheduleCell';

const Container = styled.div `
  width: 200px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

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

    let tasks = this.props.usersData;

    if (tasks) {
      for (let key in tasks) {
        data.push({
          date: moment(key).format('MM.DD.YYYY'),
          taskKey: key,
          desc: tasks[key]
        });
      };
    };
    
    for (; start < end; start.add(1, 'day').clone()) {
      const currentDay = {};

      data.forEach(task => {
        if (start.format('MM.DD.YYYY') === task.date) {
          currentDay.task = task.desc;
          currentDay.taskKey = task.taskKey;
        } 
      }); 

      currentDay.fullDate = start.format('MM.DD.YYYY');
      currentDay.label = start.format('D');
      currentDay.prev = (start.month() < month && !(start.year() > year)) || start.year() < year;
      currentDay.next = start.month() > month || start.year() > year;
      currentDay.curr = (start.date() === currDay && start.month() === month);
      currentDay.today = !isNaN(start.date()) &&
                         !isNaN(start.month())  &&
                         !isNaN(start.year());

      days.push(currentDay);
    };
    return days 
  }

  render() {
    return (
      <Container>
       {this.state.days.map(day => {
          return <ScheduleCell value = {day.label}
                               key = {day.fullDate}
                               className = {{
                                 'prev': day.prev,
                                 'next': day.next,
                                 'curr': day.curr,
                                 'today': day.today
                               }}
                               fullDate = {day.fullDate}
                               onClickDay = {this.props.onClickDay}
                               task = {day.task}
                               taskKey = {day.taskKey}
                
                />
        })}
      </Container>
    )
  }
}

export default CalendarContainer;
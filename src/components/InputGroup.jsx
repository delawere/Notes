import React, { PureComponent } from 'react';
import fire from '../config/Fire';
import Item from './Item';
import GetUsers from './GetUsers';

const period = {
  to: '',
  from: '',
};

class InputGroup extends PureComponent {

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
      currentDays: {
        Monday: period,
        Tuesday: period,
        Wednesday: period,
        Thursday: period,
        Friday: period,
        Saturday: period,
        Sunday: period,
      },
      beginTime: '',
      endTime: '',
    };

    this.database = fire.database();
    this.userId = localStorage.getItem('user');

    this.currentTimes = {};
  }

  async componentDidMount() {
    const userId = this.userId;
    const currentDays = await this.fetchData(InputGroup.days, userId);
    this.setState({ currentDays });
  }

  async fetchData(days, userId) {

    const data = {};

    const tasks = days.map(day => {
      const dayRef = `users/${userId}/time/${day}`;
      return this.database.ref(dayRef).once('value');
    });

    const res = await Promise.all(tasks);

    res.forEach(snapshot => {
      const { key } = snapshot;
      data[key] = snapshot.val() || {};
    });
    return data;
  }

  render() {
    return (
      <div>
        {InputGroup.days.map(day => (
          <Item
            key={day}
            weekday={day}
            from={this.state.currentDays[day].from}
            to={this.state.currentDays[day].to}
          />
        ))}
        <GetUsers />
      </div>
    );
  }
}

export default InputGroup;
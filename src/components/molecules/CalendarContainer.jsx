import React, { PureComponent } from "react";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";

import ScheduleCell from "./ScheduleCell";

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`;

class CalendarContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      days: []
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.date === this.props.date) {
      return;
    }

    const days = await this.getDays();

    this.setState({
      days
    });
  }

  async componentDidMount() {
    const days = await this.getDays();

    this.setState({
      days
    });
  }

  async getDays() {
    const { date } = this.props;
    const now = date ? date : moment();
    const start = now
      .clone()
      .startOf("month")
      .weekday(1);
    const end = now
      .clone()
      .endOf("month")
      .weekday(7);
    const month = now.month();
    const currDay = now.date();
    const year = now.year();

    let days = [];
    let data = [];

    const { activeTasks } = this.props;

    if (activeTasks) {
      for (let key in activeTasks) {
        data.push({
          date: moment(key).format("MM.DD.YYYY"),
          taskKey: key,
          activeDesc: activeTasks[key]
        });
      }
    }

    for (; start < end; start.add(1, "day").clone()) {
      const currentDay = {};

      data.forEach(({ date, activeDesc, taskKey }) => {
        if (start.format("MM.DD.YYYY") === date) {
          currentDay.activeDesc = activeDesc;
          currentDay.taskKey = taskKey;
        }
      });

      currentDay.fullDate = start.format("MM.DD.YYYY");
      currentDay.label = start.format("D");
      currentDay.prev =
        (start.month() < month && !(start.year() > year)) ||
        start.year() < year;
      currentDay.next = start.month() > month || start.year() > year;
      currentDay.curr = start.date() === currDay && start.month() === month;
      currentDay.today =
        !isNaN(start.date()) && !isNaN(start.month()) && !isNaN(start.year());

      days.push(currentDay);
    }
    return days;
  }

  render() {
    return (
      <Container>
        {this.state.days.map(
          ({
            label,
            fullDate,
            prev,
            next,
            curr,
            today,
            activeDesc,
            taskKey
          }) => {
            return (
              <ScheduleCell
                value={label}
                key={fullDate}
                className={{
                  prev: prev,
                  next: next,
                  curr: curr,
                  today: today
                }}
                fullDate={fullDate}
                onClickDay={this.props.onClickDay}
                activeTasks={activeDesc}
                taskKey={taskKey}
              />
            );
          }
        )}
      </Container>
    );
  }
}

CalendarContainer.propTypes = {
  date: PropTypes.object,
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object
};

export default CalendarContainer;

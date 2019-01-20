import React, { PureComponent } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";

import CalendarContainer from "../molecules/CalendarContainer";
import Arrow from "../atoms/Arrow";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  z-index: 200;
  width: 100%;
  height: 250px;
  border-radius: 3px;
  justify-content: space-around;
  padding: 20px;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  background: #fff;
`;

const CalendarWrap = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin-top: 320px;
  color: #242425;
  font-size: 15px;
  margin-left: 30px;
`;

const WeekDayContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  color: #242425;
  font-size: 12px;
  font-weight: 400;
  margin: 0 auto;
`;

class UserSchedule extends PureComponent {
  static days = [
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      month: moment().format("MM-DD-YYYY")
    };
  }

  componentDidUpdate() {
    this.setState({
      visible: true
    });
  }

  closeWindow = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  prevMonth = () => {
    const currentMonth = this.state.month;
    this.setState({
      month: moment(currentMonth)
        .subtract(1, "month")
        .format("MM-DD-YYYY")
    });
  };

  nextMonth = () => {
    const currentMonth = this.state.month;
    this.setState({
      month: moment(currentMonth)
        .add(1, "month")
        .format("MM-DD-YYYY")
    });
  };

  render() {
    return (
      <React.Fragment>
        <Title>{moment(this.state.month).format("MMMM YYYY")}</Title>
        <Wrapper>
          <Arrow arrowSide={"left"} onClick={this.prevMonth} />
          <CalendarWrap>
            <WeekDayContainer>
              {UserSchedule.days.map(weekday => {
                return <div key={weekday}>{weekday[0]}</div>;
              })}
            </WeekDayContainer>
            <CalendarContainer
              date={moment(this.state.month)}
              onClickDay={this.props.onClickDay}
              activeTasks={this.props.activeTasks}
              doneTasks={this.props.doneTasks}
            />
          </CalendarWrap>
          <Arrow arrowSide={"right"} onClick={this.nextMonth} />
        </Wrapper>
      </React.Fragment>
    );
  }
}

UserSchedule.propTypes = {
  activeTasks: PropTypes.object,
  doneTasks: PropTypes.object,
  onClickDay: PropTypes.func
};

export default UserSchedule;

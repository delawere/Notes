import React, { PureComponent } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import PropTypes from 'prop-types';

import CalendarContainer from '../molecules/CalendarContainer';
import Arrow from '../atoms/Arrow';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  z-index: 200;
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
  color: #242425;
  font-size: 16px;
  margin-left: 50px;
  font-weight: 600;
`;

const WeekDayContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  color: #242425;
  font-size: 13px;
  font-weight: 500;
  margin: 0 auto;
  padding-bottom: 8px;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.08);
`;

const WeakDayCell = styled.div`
  text-align: center;
  width: 14.285%;
`;

const HolidayCell = styled(WeakDayCell)`
  color: tomato;
`;

class UserSchedule extends PureComponent {
  static days = [
    'Monday',
    'Thuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      month: moment().format('MM-DD-YYYY')
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
        .subtract(1, 'month')
        .format('MM-DD-YYYY')
    });
  };

  nextMonth = () => {
    const currentMonth = this.state.month;
    this.setState({
      month: moment(currentMonth)
        .add(1, 'month')
        .format('MM-DD-YYYY')
    });
  };

  render() {
    return (
      <React.Fragment>
        <Title>{moment(this.state.month).format('MMMM YYYY')}</Title>
        <Arrow arrowSide={'left'} onClick={this.prevMonth} />
        <Wrapper>
          <CalendarWrap>
            <WeekDayContainer>
              {UserSchedule.days.map(weakday => {
                if (weakday[0] !== 'S') {
                  return <WeakDayCell key={weakday}>{weakday}</WeakDayCell>;
                }
                return <HolidayCell key={weakday}>{weakday}</HolidayCell>;
              })}
            </WeekDayContainer>
            <CalendarContainer
              date={moment(this.state.month)}
              onClickDay={this.props.onClickDay}
              activeTasks={this.props.activeTasks}
            />
          </CalendarWrap>
        </Wrapper>
        <Arrow arrowSide={'right'} onClick={this.nextMonth} />
      </React.Fragment>
    );
  }
}

UserSchedule.propTypes = {
  activeTasks: PropTypes.object,
  onClickDay: PropTypes.func
};

export default UserSchedule;

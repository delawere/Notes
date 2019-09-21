import React, { PureComponent } from 'react';
import AsideMenu from '../organisms/AsideMenu';
import FirebaseRequest from '../FirebaseRequest';
import Header from '../organisms/Header';
import * as moment from 'moment';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { LOGIN } from '../../router/constants';

const Container = styled.div`
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 10vh;
`;

const MainContainer = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default class Home extends PureComponent {
  parseTasksObjectToArray = data => {
    const result = [];
    for (let key in data) {
      result.push({
        key: key,
        text: data[key].task,
        type: data[key].type
      });
    }

    return result;
  };

  onClickDay = data => {
    const { date } = data;
    const { addCurrentDayTasks, addCurrentDayDate } = this.props;
    const activeTasks = this.parseTasksObjectToArray(data.activeTasks);

    addCurrentDayDate(date);
    addCurrentDayTasks(activeTasks);
  };

  componentDidMount() {
    this.getUsersData(moment().format('MM-DD-YYYY'));
  }

  getUsersData = async todayDate => {
    const { addTasks, currentDayDate } = this.props;
    const { addCurrentDayTasks, addCurrentDayDate } = this.props;

    //Обновлять попап нужно либо по клику, либо при инициализации.
    //Второе выполняется в componentDidMount. Соответственно, одна из дат должна присутствовать.
    if (!currentDayDate && !todayDate) {
      return;
    }
    const usersData = await FirebaseRequest.getData();

    const currentDate = currentDayDate || todayDate;
    const currentDateFormatted = moment(currentDate).format('MM-DD-YYYY');

    addTasks(usersData);

    // Условие ниже отрабатывает при первом запуске, для установки текущего дня по-умолчанию
    if (todayDate) {
      addCurrentDayDate(todayDate);

      const currentDayTasks = this.parseTasksObjectToArray(
        usersData[currentDateFormatted]
      );
      addCurrentDayTasks(currentDayTasks);
    }
  };

  render() {
    if (this.props.user) {
      return (
        <Container>
          <Header userLogged={this.props.user} />
          <MainContainer>
            <AsideMenu
              onClickDay={this.onClickDay}
              onAfterSubmit={this.getUsersData}
            />
          </MainContainer>
        </Container>
      );
    }
    return <Redirect to={LOGIN} />;
  }
}

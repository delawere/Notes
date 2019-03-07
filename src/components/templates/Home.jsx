import React, { PureComponent } from "react";
import AsideMenu from "../organisms/AsideMenu";
import FirebaseRequest from "../FirebaseRequest";
import Popup from "../organisms/Popup";
import Header from "../organisms/Header";
import * as moment from "moment";
import styled from "styled-components";
import { Redirect } from "react-router";
import { LOGIN } from "../../router/constants";
 
const Container = styled.main`
  position: relative;
  background: rgb(247, 247, 247);
  display: flex;
  flex-direction: column;
  padding-top: 4.5vw;
  padding: 15px 30px;
  width: 100vw;
  height: 100%;
  padding-top: 10vh;
`;

const MainContainer = styled.div`
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
        text: data[key]
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
    this.getUsersData(moment().format("MM-DD-YYYY"));
  }

  getUsersData = async todayDate => {
    const { addTasks, currentDayTasks, currentDayDate } = this.props;
    const { addCurrentDayTasks, addCurrentDayDate } = this.props;

    //Обновлять попап нужно либо по клику, либо при инициализации.
    //Второе выполняется в componentDidMount. Соответственно, одна из дат должна присутствовать.
    if (!currentDayDate && !todayDate) {
      return;
    }
    const usersData = await FirebaseRequest.getData();

    const { active } = usersData;
    const currentDate = currentDayDate || todayDate;
    const currentDateFormatted = moment(currentDate).format("MM-DD-YYYY");

    if (active) {
      const newActiveTask = this.parseTasksObjectToArray(
        active[currentDateFormatted]
      );

      currentDayTasks.active = newActiveTask || [];
    }

    addTasks(usersData.active);

    // Условие ниже отрабатывает при первом запуске, для установки текущего дня по-умолчанию
    if (todayDate) {
      addCurrentDayDate(todayDate);

      addCurrentDayTasks(currentDayTasks.active);
    }
  };

  render() {
    if (this.props.user) {
      return (
        <Container className="container" style={{ background: "#f7f7f7" }}>
          <Header userLogged={this.props.user} />
          <MainContainer>
            <AsideMenu onClickDay={this.onClickDay} />
            <Popup onAfterSubmit={this.getUsersData} />
          </MainContainer>
        </Container>
      );
    }
    return <Redirect to={LOGIN} />;
  }
}

import React, { PureComponent } from "react";
import AsideMenu from "../organisms/AsideMenu";
import FirebaseRequest from "../FirebaseRequest";
import Popup from "../organisms/Popup";
import Header from "../organisms/Header";
import * as moment from "moment";
import styled from "styled-components";

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
    const doneTasks = this.parseTasksObjectToArray(data.doneTasks);
    const activeTasks = this.parseTasksObjectToArray(data.activeTasks);

    addCurrentDayDate(date);

    addCurrentDayTasks({
      active: activeTasks,
      done: doneTasks
    });

    this.setState({
      currentDayTasks: {
        doneTasks: doneTasks,
        activeTasks: activeTasks
      },
      currentDayDate: date
    });
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

    const { active, done } = usersData;
    const currentDate = currentDayDate || todayDate;
    const currentDateFormatted = moment(currentDate).format("MM-DD-YYYY");

    if (active) {
      const newActiveTask = this.parseTasksObjectToArray(
        active[currentDateFormatted]
      );

      currentDayTasks.active = newActiveTask || [];
    }

    if (done) {
      const newDoneTask = this.parseTasksObjectToArray(
        done[currentDateFormatted]
      );

      currentDayTasks.done = newDoneTask || [];
    }

    addTasks({
      active: usersData.active,
      done: usersData.done
    });

    // Условие ниже отрабатывает при первом запуске, для установки текущего дня по-умолчанию
    if (todayDate) {
      addCurrentDayDate(todayDate);

      addCurrentDayTasks({
        active: currentDayTasks.active,
        done: currentDayTasks.done
      });
    }
  };

  render() {
    return (
      <Container className="container" style={{ background: "#f7f7f7" }}>
        <Header userLogged={this.props.currentUser} />
        <MainContainer>
          <AsideMenu onClickDay={this.onClickDay} />
          <Popup
            onAfterSubmit={this.getUsersData}
          />
        </MainContainer>
      </Container>
    );
  }
}

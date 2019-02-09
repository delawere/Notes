import React, { Component } from "react";
import AsideMenu from "../organisms/AsideMenu";
import FirebaseRequest from "../FirebaseRequest";
import Popup from "../organisms/Popup";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import * as moment from "moment";
import styled from "styled-components";

const Container = styled.main`
  background: rgb(247, 247, 247);
  display: flex;
  padding-top: 4.5vw;
  padding: 25px 30px;
  width: 100%;
  padding-top: 10vh;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
      currentDayTasks: {
        doneTasks: [],
        activeTasks: []
      },
      currentDayDate: "",
      activeTasks: {},
      doneTasks: {}
    };
  }

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
    const doneTasks = this.parseTasksObjectToArray(data.doneTasks);
    const activeTasks = this.parseTasksObjectToArray(data.activeTasks);

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
    const { currentDayDate, currentDayTasks } = this.state;
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

      currentDayTasks.activeTasks = newActiveTask || [];
    }

    if (done) {
      const newDoneTask = this.parseTasksObjectToArray(
        done[currentDateFormatted]
      );

      currentDayTasks.doneTasks = newDoneTask || [];
    }

    this.setState({
      doneTasks: usersData.done,
      activeTasks: usersData.active,
      currentDayTasks,
      popupVisible: true
    });

    // Условие ниже отрабатывает при первом запуске, для установки текущего дня по-умолчанию
    if (todayDate) {
      // костыль с task потом убрать

      this.setState({
        currentDayTasks,
        currentDayDate: todayDate
      });
    }
  };

  closePopup = async () => {
    await this.getUsersData();
    this.setState({
      popupVisible: false
    });
  };

  render() {
    return (
      <Container className="container" style={{ background: "#f7f7f7" }}>
        <Header userLogged={this.props.currentUser} />
        <AsideMenu
          onClickDay={this.onClickDay}
          activeTasks={this.state.activeTasks}
          doneTasks={this.state.doneTasks}
        />
        {this.state.popupVisible ? (
          <Popup
            tasks={this.state.currentDayTasks}
            date={this.state.currentDayDate}
            closePopup={this.closePopup}
            onAfterSubmit={this.getUsersData}
          />
        ) : null}
        <Footer />
      </Container>
    );
  }
}

export default Home;

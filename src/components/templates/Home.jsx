import React, { Component } from "react";
import fire from "../../config/Fire";
import AsideMenu from "../organisms/AsideMenu";
import FirebaseRequest from "../FirebaseRequest";
import Popup from "../organisms/Popup";
import * as moment from "moment";

const database = fire.database();
const userId = localStorage.getItem("user");

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
      currentDayTasks: {},
      currentDayDate: "",
      activeTasks: {},
      doneTasks: {}
    };
  }

  onClickDay = data => {
    const { date } = data;

    this.setState({
      currentDayTasks: data,
      currentDayDate: date
    });
  };

  componentDidMount() {
    this.getUsersData(moment().format("MM-DD-YYYY"));
  }

  async getTasks() {
    let result = {};
    const tasks = database
      .ref(`users/${userId}/tasks/active`)
      .once("value", snap => {
        result = snap.val() || {};
      });
    await tasks;

    return result;
  }

  getUsersData = async todayDate => {
    const usersData = await FirebaseRequest.getData();
    const { currentDayDate, currentDayTasks } = this.state;
    const newTask =
      usersData.active[moment(currentDayDate).format("MM-DD-YYYY")];
    if (currentDayTasks) {
      currentDayTasks.task = newTask;
    }
    this.setState({
      doneTasks: usersData.done,
      activeTasks: usersData.active,
      currentDayTasks,
      popupVisible: true
    });

    // Условие ниже отрабатывает при первом запуске, для установки текущего дня по-умолчанию
    if (todayDate) {
      const task = {};

      // костыль с task потом убрать
      this.setState({
        currentDayTasks: { task: usersData.active[todayDate] },
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
      <div className="container" style={{ background: "#f7f7f7" }}>
        <AsideMenu
          onClickDay={this.onClickDay}
          activeTasks={this.state.activeTasks}
          doneTasks={this.state.doneTasks}
        />
        {this.state.popupVisible ? (
          <Popup
            tasks={this.state.currentDayTasks}
            closePopup={this.closePopup}
            onAfterSubmit={this.getUsersData}
          />
        ) : null}
      </div>
    );
  }
}

export default Home;

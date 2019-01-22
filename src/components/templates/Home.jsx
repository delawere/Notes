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
    const newActiveTask = this.parseTasksObjectToArray(
      active[currentDateFormatted]
    );
    const newDoneTask = this.parseTasksObjectToArray(
      done[currentDateFormatted]
    );

    currentDayTasks.activeTasks = newActiveTask || [];
    currentDayTasks.doneTasks = newDoneTask || [];

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
      <div className="container" style={{ background: "#f7f7f7" }}>
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
      </div>
    );
  }
}

export default Home;

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
      tasks: {}
    };
  }

  onClickDay = data => {
    const { date } = data;
    this.setState({
      popupVisible: true,
      currentDayTasks: data,
      currentDayDate: date
    });
  };

  componentDidMount() {
    this.getUsersData();
    this.setState({
      currentDayTasks: this.state.tasks[this.state.currentDayDate]
    });
  }

  async getTasks() {
    let result = {};
    const tasks = database.ref(`users/${userId}/tasks`).once("value", snap => {
      result = snap.val() || {};
    });
    await tasks;

    return result;
  }

  getUsersData = async () => {
    const usersData = await FirebaseRequest.getData();
    const { currentDayDate, currentDayTasks } = this.state;
    const newTask = usersData[moment(currentDayDate).format("MM-DD-YYYY")];
    if (currentDayTasks) {
      currentDayTasks.task = newTask;
    }
    this.setState({
      tasks: usersData,
      currentDayTasks
    });
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
        <AsideMenu onClickDay={this.onClickDay} usersData={this.state.tasks} />
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

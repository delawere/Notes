import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";
import FirebaseRequest from "../FirebaseRequest";

import PopupList from "../molecules/PopupList";
import AddForm from "../molecules/AddForm";
import DeleteAllTasksButton from "../atoms/DeleteAllTasksButton";
import PopupActions from "./PopupActions";
import ShowListControls from "../molecules/ShowListControls";

const Wrapper = styled.div`
  position: fixed;
  height: 80%;
  width: 60vw;
  z-index: 999;
  top: 3%;
  left: 25vw;
  color: #242425;
`;

const Title = styled.div`
  color: rgba(175, 47, 47, 0.35);
  margin: 0 auto;
  text-align: center;
  font-size: 54px;
  font-weight: 500;
`;

const PopupContainer = styled.div`
  width: 80%;
  max-width: 950px;
  background-color: #fff;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: auto;
  margin-top: 25px;
  padding: 5px 15px;
  padding-top: 0;
`;

const PopupHeader = styled.header`
  width: 100%;
  padding: 20px 0;
  font-size: 1.8rem;
  font-weight: 450;
`;

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullDate: "",
      date: "",
      activeTask: [],
      doneTask: [],
      removeList: []
    };
  }

  static getDerivedStateFromProps({ tasks, date }) {
    return {
      fullDate: date,
      date: moment(date).format("D MMMM"),
      activeTask: tasks.activeTasks || [],
      doneTask: tasks.doneTasks || []
    };
  }

  refreshDataSet = (newTask, active) => {
    const { activeTask, doneTask } = PopupActions.refreshDataSet(
      newTask,
      [...this.state.activeTask],
      [...this.state.doneTask],
      active
    );
    this.setState({
      activeTask,
      doneTask
    });

    this.props.onAfterSubmit();
  };

  removeTask = async key => {
    try {
      const currentDate = moment(this.props.date).format("MM-DD-YYYY");
      const currentTasks = await PopupActions.removeTask(currentDate, key, [
        ...this.state.activeTask
      ]);
      this.setState({
        activeTask: currentTasks
      });
      this.props.onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  addTaskToRemoveGroup = (key, checked) => {
    const removeList = PopupActions.addToRemoveGroup(
      [...this.state.removeList],
      key,
      checked
    );

    this.setState({
      removeList
    });
  };

  deleteMarkedTasks = () => {
    if (this.state.removeList.length > 0) {
      this.state.removeList.forEach(taskKey => this.removeTask(taskKey));
    }
  };

  moveTaskToDone = async (taskKey, text) => {
    try {
      const currentDate = moment(this.props.date).format("MM-DD-YYYY");
      await FirebaseRequest.moveTaskToDone(text, currentDate);
      await this.removeTask(taskKey);
      this.refreshDataSet({ key: taskKey, task: text }, false);
    } catch (error) {
      console.error(`Move failed. Error: ${error}`);
    }
  };

  render() {
    return (
      <Wrapper>
        <Title>todos</Title>
        <PopupContainer>
          <PopupHeader>{moment(this.props.date).format("D MMMM")}</PopupHeader>
          <DeleteAllTasksButton
            deleteMarkedTasks={this.deleteMarkedTasks}
            visible={this.state.removeList.length > 0}
          />
          <PopupList
            title="Active"
            tasksList={this.state.activeTask}
            onRemove={this.removeTask}
            addTaskToRemoveGroup={this.addTaskToRemoveGroup}
            moveTaskToDone={this.moveTaskToDone}
          />
          <PopupList
            title="Done"
            tasksList={this.state.doneTask}
            onRemove={this.removeTask}
            addTaskToRemoveGroup={this.addTaskToRemoveGroup}
          />
          <AddForm
            date={moment(this.props.date).format("MM-DD-YYYY")}
            refreshDataSet={this.refreshDataSet}
          />
          <ShowListControls />
        </PopupContainer>
      </Wrapper>
    );
  }
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  tasks: PropTypes.object
};

export default Popup;

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
  top: 8%;
  left: 25vw;
  color: #242425;
`;

const PopupContainer = styled.div`
  width: 80%;
  transition: 5s ease-out;
  max-width: 950px;
  background-color: #fff;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
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

const ControlsContainer = styled.div`
  display: flex;
  padding-top: 15px;
`;

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullDate: "",
      date: "",
      activeTask: [],
      doneTask: [],
      removeList: [],
      visibleList: "all"
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

  hideList = listName => {
    this.setState(
      {
        visibleList: listName
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { visibleList } = this.state;
    return (
      <Wrapper>
        <PopupContainer>
          <ControlsContainer>
            <DeleteAllTasksButton
              deleteMarkedTasks={this.deleteMarkedTasks}
              visible={this.state.removeList.length > 0}
            />
            <DeleteAllTasksButton
              deleteMarkedTasks={this.deleteMarkedTasks}
              visible={this.state.removeList.length > 0}
            />
          </ControlsContainer>
          <PopupHeader>{moment(this.props.date).format("D MMMM")}</PopupHeader>
          <PopupList
            title="Active"
            tasksList={this.state.activeTask}
            visible={
              visibleList === "active" || visibleList === "all" ? true : false
            }
            onRemove={this.removeTask}
            addTaskToRemoveGroup={this.addTaskToRemoveGroup}
            moveTaskToDone={this.moveTaskToDone}
          />
          <PopupList
            title="Done"
            tasksList={this.state.doneTask}
            visible={
              visibleList === "done" || visibleList === "all" ? true : false
            }
            onRemove={this.removeTask}
            addTaskToRemoveGroup={this.addTaskToRemoveGroup}
          />
          <AddForm
            date={moment(this.props.date).format("MM-DD-YYYY")}
            refreshDataSet={this.refreshDataSet}
          />
          <ShowListControls
            hideList={this.hideList}
            activeButton={this.state.visibleList}
          />
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

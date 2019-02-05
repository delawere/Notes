import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";
import FirebaseRequest from "../FirebaseRequest";

import PopupList from "../molecules/PopupList";
import AddForm from "../molecules/AddForm";
import PopupActions from "./PopupActions";
import ShowListControls from "../molecules/ShowListControls";
import MenuButton from "../atoms/MenuButton";
import Menu from "../molecules/Menu";

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
  padding: 10px 45px;
  padding-bottom: 5px;
`;

const PopupHeader = styled.header`
  width: 100%;
  padding: 20px 0;
  font-size: 1.8rem;
  font-weight: 450;
  display: flex;
  justify-content: space-between;
`;

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullDate: "",
      date: "",
      activeTask: [],
      doneTask: [],
      markedList: [],
      visibleList: "all",
      showMenu: false
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

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({
      showMenu: false
    });
  };

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
      const currentTasks = await PopupActions.removeTask(
        currentDate,
        key,
        [...this.state.activeTask],
        [...this.state.doneTask]
      );
      this.setState({
        [currentTasks.categoryName]: currentTasks.currentTasks
      });
      this.props.onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  addTaskToMarkedGroup = (task, checked) => {
    const markedList = PopupActions.addToMarkedGroup(
      [...this.state.markedList],
      task,
      checked
    );

    this.setState({
      markedList
    });
  };

  moveTaskToDone = async (taskKey, text) => {
    try {
      const currentDate = moment(this.props.date).format("MM-DD-YYYY");
      await FirebaseRequest.moveTaskToDone(text, currentDate);
      await this.removeTask(taskKey);
      this.refreshDataSet({ key: taskKey, task: text }, false);
    } catch (error) {
      console.error(`Move failed. ${error}`);
    }
  };

  applyChange = (list, callback) => {
    if (list.length > 0) {
      list.forEach(it => callback(it.taskKey, it.text));
    }
  };

  hideList = listName => {
    this.setState({
      visibleList: listName
    });
  };

  render() {
    const { visibleList, markedList } = this.state;
    return (
      <Wrapper>
        <PopupContainer>
          <PopupHeader>
            {moment(this.props.date).format("D MMMM")}
            <Menu
              visible={this.state.showMenu}
              addMarkedTasksToDone={() =>
                this.applyChange(markedList, this.moveTaskToDone)
              }
              deleteMarkedTasks={() =>
                this.applyChange(markedList, this.removeTask)
              }
            />
            <MenuButton />
          </PopupHeader>
          <PopupList
            title="Active"
            tasksList={this.state.activeTask}
            visible={
              visibleList === "active" || visibleList === "all" ? true : false
            }
            onRemove={this.removeTask}
            addTaskToMarkedGroup={this.addTaskToMarkedGroup}
            moveTaskToDone={this.moveTaskToDone}
          />
          <PopupList
            title="Done"
            tasksList={this.state.doneTask}
            visible={
              visibleList === "done" || visibleList === "all" ? true : false
            }
            onRemove={this.removeTask}
            addTaskToMarkedGroup={this.addTaskToMarkedGroup}
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

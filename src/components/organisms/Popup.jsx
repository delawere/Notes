import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCurrentDayTasks, addNewTask } from "../../store/actions";
import { bindActionCreators } from "redux";

import PopupList from "../molecules/PopupList";
import AddForm from "../molecules/AddForm";
import PopupActions from "./PopupActions";
import ShowListControls from "../molecules/ShowListControls";
import MenuButton from "../atoms/MenuButton";
import Menu from "../molecules/Menu";

const Wrapper = styled.div`
  min-height: 60vh;
  margin-top: 25px;
  margin-bottom: 35px;
  width: 60vw;
  margin-left: 85px;
  z-index: 999;
  color: #242425;
`;

const PopupContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  margin: auto;
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

const putStateToProps = state => {
  return {
    currentDate: state.currentDayDate,
    active: state.currentDayTasks.active,
    done: state.currentDayTasks.done
  };
};

const putActionsToProps = dispatch => {
  return {
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addNewTask: bindActionCreators(addNewTask, dispatch)
  };
};

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

  static getDerivedStateFromProps({ currentData, active, done }) {
    return {
      fullDate: currentData,
      date: moment(currentData).format("D MMMM"),
      activeTask: active || [],
      doneTask: done || []
    };
  }

  refreshDataSet = (newTask, active) => {
    const { addCurrentDayTasks } = this.props;
    const { activeTasks, doneTasks } = PopupActions.refreshDataSet(
      newTask,
      [...this.props.active],
      [...this.props.done],
      active
    );

    addCurrentDayTasks({
      active: activeTasks,
      done: doneTasks
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

      this.props.addNewTask({
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
    const { currentDate, active } = this.props;
    return (
      <Wrapper>
        <PopupContainer>
          <PopupHeader>
            {moment(currentDate).format("D MMMM")}
            <Menu
              visible={this.state.showMenu}
              deleteMarkedTasks={() =>
                this.applyChange(markedList, this.removeTask)
              }
            />
            <MenuButton />
          </PopupHeader>
          <PopupList
            tasksList={active}
            visible={
              visibleList === "active" || visibleList === "all" ? true : false
            }
            onRemove={this.removeTask}
            addTaskToMarkedGroup={this.addTaskToMarkedGroup}
            moveTaskToDone={this.moveTaskToDone}
          />
          <AddForm
            date={moment(currentDate).format("MM-DD-YYYY")}
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

Popup = connect(
  putStateToProps,
  putActionsToProps
)(Popup);

Popup.propTypes = {
  closePopup: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  tasks: PropTypes.object
};

export default Popup;

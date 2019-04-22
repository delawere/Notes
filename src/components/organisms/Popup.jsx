import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addCurrentDayTasks,
  addNewTask,
  switchShowedTasksList,
  addTaskToMarkedTasksList
} from "../../store/actions";
import { bindActionCreators } from "redux";

import PopupList from "../molecules/PopupList";
import AddForm from "../molecules/AddForm";
import PopupActions from "./PopupActions";
import ShowListControls from "../molecules/ShowListControls";
import MenuButton from "../atoms/MenuButton";
import Menu from "../molecules/Menu";

const Wrapper = styled.div`
  min-height: 300px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  margin-top: 25px;
  margin-bottom: 35px;
  flex: 2;
  color: #242425;
  position: absolute;
  top: ${props => props.x}px;
  left: ${props => props.y}px;
`;

const PopupContainer = styled.div`
  width: 100%;
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
    active: state.currentDayTasks,
    showedTasksList: state.showedTasksList,
    markedList: state.markedList,
    coordinates: state.coordinates
  };
};

const putActionsToProps = dispatch => {
  return {
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addNewTask: bindActionCreators(addNewTask, dispatch),
    switchShowedTasksList: bindActionCreators(switchShowedTasksList, dispatch),
    addTaskToMarkedTasksList: addTaskToMarkedTasksList(
      addTaskToMarkedTasksList,
      dispatch
    )
  };
};

class Popup extends Component {
  static getDerivedStateFromProps({ currentData, active }) {
    return {
      fullDate: currentData,
      date: moment(currentData).format("D MMMM"),
      activeTask: active || []
    };
  }

  refreshDataSet = (newTask, active) => {
    const { addCurrentDayTasks, onAfterSubmit } = this.props;
    const { activeTasks } = PopupActions.refreshDataSet(
      newTask,
      [...this.props.active],
      active
    );
    addCurrentDayTasks(activeTasks);
    onAfterSubmit();
  };

  removeTask = async key => {
    try {
      const { addNewTask, onAfterSubmit } = this.props;
      const currentDate = moment(this.props.currentDate).format("MM-DD-YYYY");
      const currentTasks = await PopupActions.removeTask(currentDate, key, [
        ...this.props.active
      ]);

      addNewTask(currentTasks.currentTasks);
      onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  addTaskToMarkedGroup = (task, checked) => {
    const markedList = PopupActions.addToMarkedGroup(
      [...this.props.markedList],
      task,
      checked
    );

    addTaskToMarkedTasksList(markedList);
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
    this.props.switchShowedTasksList(listName);
  };

  markAsDone = key => {
    const { currentDayTasks } = this.props.active;
    const result = currentDayTasks.map(task => {
      if (task.key === key) {
        return (task.done = true);
      }
      return task;
    });
    return result;
  };

  render() {
    const {
      currentDate,
      active,
      showedTasksList,
      markedList,
      coordinates
    } = this.props;
    return (
      <Wrapper x={coordinates.x} y={coordinates.y}>
        <PopupContainer>
          <PopupHeader>
            {currentDate
              ? moment(currentDate).format("D MMMM")
              : moment().format("D MMMM")}
            <Menu
              deleteMarkedTasks={() =>
                this.applyChange(markedList, this.removeTask)
              }
            />
            <MenuButton />
          </PopupHeader>
          <PopupList
            tasksList={active}
            visible={
              showedTasksList === "active" || showedTasksList === "all"
                ? true
                : false
            }
            onRemove={this.removeTask}
            addTaskToMarkedGroup={this.addTaskToMarkedGroup}
          />
          <AddForm
            date={moment(currentDate).format("MM-DD-YYYY")}
            refreshDataSet={this.refreshDataSet}
          />
          <ShowListControls
            hideList={this.hideList}
            activeButton={showedTasksList}
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

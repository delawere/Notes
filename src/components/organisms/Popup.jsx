import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addCurrentDayTasks,
  addNewTask,
  switchShowedTasksList,
  addTaskToMarkedTasksList,
  setPopupVisible
} from "../../store/actions";
import { bindActionCreators } from "redux";

import PopupList from "../molecules/PopupList";
import AddForm from "../molecules/AddForm";
import PopupActions from "./PopupActions";
import ShowListControls from "../molecules/ShowListControls";
import ClosePopupButton from "../atoms/ClosePopupButton";
import Menu from "../molecules/Menu";

const popupWidth = '60vw';
const clientWidth = document.documentElement.clientWidth;

const Wrapper = styled.div`
  z-index: 2;
  width: ${popupWidth};
  max-width: 600px;
  background-color: #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  color: #242425;
  position: absolute;
  top: 2em;
  left: calc(50% - ${clientWidth * 0.6 > 600 ? '600px' : clientWidth * 0.6} / 2);
  display: ${props => (props.isVisible ? "" : "none")};
`;

const PopupContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 0.5rem 2rem;
  padding-bottom: 5px;
`;

const PopupHeader = styled.header`
  width: 100%;
  padding: 4px 0;
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
    popupVisible: state.popupVisible
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
    ),
    setPopupVisible: bindActionCreators(setPopupVisible, dispatch)
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
      popupVisible,
      setPopupVisible,
    } = this.props;

    return (
      <Wrapper isVisible={popupVisible}>
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
            <ClosePopupButton closePopup={setPopupVisible} />
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

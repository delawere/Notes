import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrentDayTasks, addNewTask } from '../../store/actions';
import { bindActionCreators } from 'redux';

import TodoList from '../molecules/TodoList';
import TasksFormActions from './TasksFormActions';
import Popup from './Popup';

const Wrapper = styled.div`
  margin-left: 5em;
  width: 100%;
  color: #242425;
  background-color: rgba(0, 0, 0, 0, 25);
  max-width: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding: 0.5rem 2rem;
  padding-bottom: 5px;
`;

const Header = styled.header`
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
    showedTasksList: state.showedTasksList
  };
};

const putActionsToProps = dispatch => {
  return {
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addNewTask: bindActionCreators(addNewTask, dispatch)
  };
};

class TasksForm extends Component {
  constructor(props) {
    super(props);
    this.popupWrapper = React.createRef();

    this.state = {
      popupVisible: false,
      popupCoordinates: {
        x: 0,
        y: 0
      },
      processedTask: {
        id: '',
        currentText: '',
        newText: ''
      }
    };
  }

  static popupItems = ['Edit', 'Delete', 'Move'];

  refreshDataSet = (newTask, active) => {
    const { addCurrentDayTasks, onAfterSubmit } = this.props;
    const { activeTasks } = TasksFormActions.refreshDataSet(
      newTask,
      [...this.props.active],
      active
    );
    addCurrentDayTasks(activeTasks);
    onAfterSubmit();
  };

  onPopupItemClick = async (key, actionType) => {
    switch (actionType) {
      case 'Delete':
        this.removeTask(key);
        break;
      case 'Edit':
        this.edittask(key);
        break;
      case 'Move':
        this.moveTask(key);
        break;
      default:
        throw Error(`${actionType} action is not supported`);
    }
    this.closePopup();
  };

  removeTask = async key => {
    try {
      const { addNewTask, onAfterSubmit } = this.props;
      const currentDate = moment(this.props.currentDate).format('MM-DD-YYYY');
      const currentTasks = await TasksFormActions.removeTask(currentDate, key, [
        ...this.props.active
      ]);

      addNewTask(currentTasks.currentTasks);
      onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  editTask = key => {};

  applyChange = (list, callback) => {
    if (list.length > 0) {
      list.forEach(it => callback(it.taskKey, it.text));
    }
  };

  changeTaskType = async ({ id, task, date, type }) => {
    const { onAfterSubmit } = this.props;
    const newType = type === 'active' ? 'done' : 'active';

    await TasksFormActions.upgradeTask({
      id,
      task,
      date,
      type: newType
    });
    await onAfterSubmit(date);
  };

  findAncestor = (target, parent) => {
    while ((target = target.parentElement) && !(target === parent));
    return target;
  };

  onOutsideClickHandler = event => {
    const parentDom = this.popupWrapper.current;
    let isOutsideClick = !this.findAncestor(event.target, parentDom);

    if (isOutsideClick) {
      this.setState(
        {
          popupVisible: false
        },
        () => document.removeEventListener('click', this.onOutsideClickHandler)
      );
    }
  };

  onPopupButtonClick = (popupX, popupY, taskId, taskText) => {
    this.setState(
      {
        popupVisible: !this.state.popupVisible
      },
      () => {
        this.state.popupVisible
          ? this.onPopupOpen(popupX, popupY, taskId, taskText)
          : this.onPopupClose();
      }
    );
  };

  closePopup = () => {
    this.setState(
      {
        popupVisible: false
      },
      () => this.onPopupClose()
    );
  };

  onPopupOpen = (popupX, popupY, taskId, taskText) => {
    this.setState(
      {
        popupCoordinates: {
          x: popupX,
          y: popupY + 25
        },
        processedTask: {
          id: taskId,
          currentText: taskText
        }
      },
      () => {
        document.addEventListener('click', this.onOutsideClickHandler);
      }
    );
  };

  onPopupClose = () => {
    this.setState(
      {
        popupCoordinates: {
          x: 0,
          y: 0
        },
        processedTask: {
          id: '',
          currentText: '',
          newText: ''
        }
      },
      () => document.removeEventListener('click', this.onOutsideClickHandler)
    );
  };

  render() {
    const { currentDate, active } = this.props;

    return (
      <Wrapper>
        <Container>
          <Header>
            {currentDate
              ? moment(currentDate).format('dddd, D MMMM')
              : moment().format('dddd, D MMMM')}
          </Header>
          <TodoList
            tasksList={active}
            onPopupButtonClick={this.onPopupButtonClick}
            changeTaskType={this.changeTaskType}
            currentDate={moment(currentDate).format('MM-DD-YYYY')}
            refreshDataSet={this.refreshDataSet}
          />
          <div ref={this.popupWrapper}>
            <Popup
              items={TasksForm.popupItems}
              onPopupItemClick={this.onPopupItemClick}
              visible={this.state.popupVisible}
              popupX={this.state.popupCoordinates.x}
              popupY={this.state.popupCoordinates.y}
              taskInfo={this.state.processedTask}
            />
          </div>
        </Container>
      </Wrapper>
    );
  }
}

TasksForm = connect(
  putStateToProps,
  putActionsToProps
)(TasksForm);

TasksForm.propTypes = {
  closePopup: PropTypes.func,
  onAfterSubmit: PropTypes.func,
  tasks: PropTypes.object
};

export default TasksForm;

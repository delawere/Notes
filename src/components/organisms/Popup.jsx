import React, { Component } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrentDayTasks, addNewTask } from '../../store/actions';
import { bindActionCreators } from 'redux';

import PopupList from '../molecules/PopupList';
import PopupActions from './PopupActions';

const Wrapper = styled.div`
  width: 50%;
  color: #242425;
  background-color: rgba(0, 0, 0, 0, 25);
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
    showedTasksList: state.showedTasksList
  };
};

const putActionsToProps = dispatch => {
  return {
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addNewTask: bindActionCreators(addNewTask, dispatch)
  };
};

class Popup extends Component {
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
      const currentDate = moment(this.props.currentDate).format('MM-DD-YYYY');
      const currentTasks = await PopupActions.removeTask(currentDate, key, [
        ...this.props.active
      ]);

      addNewTask(currentTasks.currentTasks);
      onAfterSubmit();
    } catch (e) {
      console.error(`Task doesn't remove. Error: ${e}`);
    }
  };

  applyChange = (list, callback) => {
    if (list.length > 0) {
      list.forEach(it => callback(it.taskKey, it.text));
    }
  };

  changeTaskType = async ({ id, task, date, type }) => {
    const { onAfterSubmit } = this.props;
    const newType = type === 'active' ? 'done' : 'active';

    await PopupActions.upgradeTask({
      id,
      task,
      date,
      type: newType
    });
    await onAfterSubmit(date);
  };

  render() {
    const { currentDate, active } = this.props;

    return (
      <Wrapper>
        <PopupContainer>
          <PopupHeader>
            {currentDate
              ? moment(currentDate).format('dddd, D MMMM')
              : moment().format('dddd, D MMMM')}
          </PopupHeader>
          <PopupList
            tasksList={active}
            onRemove={this.removeTask}
            changeTaskType={this.changeTaskType}
            currentDate={moment(currentDate).format('MM-DD-YYYY')}
            refreshDataSet={this.refreshDataSet}
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

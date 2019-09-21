import {
  ACTION_ADD_USER,
  ACTION_ADD_CURRENT_DAY_DATE,
  ACTION_ADD_TASKS,
  ACTION_ADD_CURRENT_DAY_TASKS,
  ACTION_ADD_NEW_TASK,
  ACTION_ADD_CURRENT_MONTH_TASKS
} from './action-types';

export const addUser = user => {
  return {
    type: ACTION_ADD_USER,
    payload: user
  };
};

export const addCurrentDayDate = currentDayDate => {
  return {
    type: ACTION_ADD_CURRENT_DAY_DATE,
    payload: currentDayDate
  };
};

export const addTasks = tasks => {
  return {
    type: ACTION_ADD_TASKS,
    payload: tasks
  };
};

export const addCurrentDayTasks = currentDayTasks => {
  return {
    type: ACTION_ADD_CURRENT_DAY_TASKS,
    payload: currentDayTasks
  };
};

export const addNewTask = newTask => {
  return {
    type: ACTION_ADD_NEW_TASK,
    payload: newTask
  };
};

export const addCurrentMonthTasks = tasksList => {
  return {
    type: ACTION_ADD_CURRENT_MONTH_TASKS,
    payload: tasksList
  };
};

import {
  ACTION_ADD_CURRENT_DAY_DATE,
  ACTION_ADD_TASKS,
  ACTION_ADD_CURRENT_DAY_TASKS,
  ACTION_ADD_NEW_TASK,
  ACTION_SWITCH_SHOWED_TASKS_LIST,
  ACTION_CHECK_TASK
} from "./action-types";

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

export const switchShowedTasksList = listName => {
  return {
    type: ACTION_SWITCH_SHOWED_TASKS_LIST,
    payload: listName
  };
};

export const addTaskToMarkedTasksList = markedList => {
  return {
    type: ACTION_CHECK_TASK,
    payload: markedList
  };
};

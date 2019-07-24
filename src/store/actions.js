import {
  ACTION_ADD_USER,
  ACTION_ADD_CURRENT_DAY_DATE,
  ACTION_ADD_TASKS,
  ACTION_ADD_CURRENT_DAY_TASKS,
  ACTION_ADD_NEW_TASK,
  ACTION_SWITCH_SHOWED_TASKS_LIST,
  ACTION_CHECK_TASK,
  ACTION_ADD_CURRENT_MONTH_TASKS,
  ACTION_PUT_POPUP_PARAMETRES,
  ACTION_SET_POPUP_VISIBLE,
  ACTION_SET_CALENDAR_COORDINATE
} from "./action-types";

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

export const addCurrentMonthTasks = tasksList => {
  return {
    type: ACTION_ADD_CURRENT_MONTH_TASKS,
    payload: tasksList
  };
};

export const putPopupParametres = parametres => {
  return {
    type: ACTION_PUT_POPUP_PARAMETRES,
    payload: parametres
  };
};

export const setPopupVisible = isVisible => {
  return {
    type: ACTION_SET_POPUP_VISIBLE,
    payload: isVisible
  };
};

export const setCalendarCoordinate = calendarCoordinate => {
  return {
    type: ACTION_SET_CALENDAR_COORDINATE,
    payload: calendarCoordinate
  };
};

import { ACTION_ADD_CURRENT_DAY_DATE, ACTION_ADD_TASKS, ACTION_ADD_CURRENT_DAY_TASKS, ACTION_ADD_NEW_TASK } from "./action-types";

export const addCurrentDayDate = currentDayDate => {
  return {
    type: ACTION_ADD_CURRENT_DAY_DATE,
    payload: currentDayDate
  }
};

export const addTasks = tasks => {
  return {
    type: ACTION_ADD_TASKS,
    payload: tasks
  }
};

export const addCurrentDayTasks = currentDayTasks => {
  return {
    type: ACTION_ADD_CURRENT_DAY_TASKS,
    payload: currentDayTasks
  }
};

export const addNewTask = newTask => {
  console.log(newTask);
  return {
    type: ACTION_ADD_NEW_TASK,
    payload: newTask
  }
};



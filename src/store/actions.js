import { ACTION_ADD_TASKS, ACTION_ADD_CURRENT_DAY_TASKS } from "./action-types";

export const addTasks = (tasks) => {
  return {
    type: ACTION_ADD_TASKS,
    payload: tasks
  }
};

export const addCurrentDayTasks = (currentDayTasks) => {
  return {
    type: ACTION_ADD_CURRENT_DAY_TASKS,
    payload: currentDayTasks
  }
};

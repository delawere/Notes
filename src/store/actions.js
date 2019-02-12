import { ACTION_ADD_DATA } from "./action-types";

const addTasks = (tasks) => {
  return {
    type: ACTION_ADD_DATA,
    payload: tasks
  }
};

export default addTasks;
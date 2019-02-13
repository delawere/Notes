import { ACTION_ADD_TASKS, ACTION_ADD_CURRENT_DAY_TASKS } from "./action-types";

const initialState = {
  tasks: {
    active: {},
    done: {},
  },
  currentDayTasks: {
    active: [],
    done: []
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case ACTION_ADD_CURRENT_DAY_TASKS:
      return {
        ...state,
        currentDayTasks: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
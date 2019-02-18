import { ACTION_ADD_CURRENT_DAY_DATE, ACTION_ADD_TASKS, ACTION_ADD_CURRENT_DAY_TASKS, ACTION_ADD_NEW_TASK } from "./action-types";

const initialState = {
  currentDayDate: '',
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
    case ACTION_ADD_CURRENT_DAY_DATE:
      return {
      ...state,
      currentDayDate: action.payload
    };
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
    case ACTION_ADD_NEW_TASK:
      return {
        ...state,
        currentDayTasks: {
          active: action.payload
        }
      }
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
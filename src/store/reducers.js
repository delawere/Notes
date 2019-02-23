import {
  ACTION_ADD_USER,
  ACTION_ADD_CURRENT_DAY_DATE,
  ACTION_ADD_TASKS,
  ACTION_ADD_CURRENT_DAY_TASKS,
  ACTION_ADD_NEW_TASK,
  ACTION_SWITCH_SHOWED_TASKS_LIST,
  ACTION_CHECK_TASK,
  ACTION_ADD_CURRENT_MONTH_TASKS
} from "./action-types";

const initialState = {
  user: "",
  currentDayDate: "",
  showedTasksList: "all",
  tasks: {},
  currentDayTasks: [],
  markedList: [],
  currentMonthTasks: []
};

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTION_ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_ADD_CURRENT_DAY_DATE:
      return {
        ...state,
        currentDayDate: action.payload
      };
    case ACTION_SWITCH_SHOWED_TASKS_LIST:
      return {
        ...state,
        showedTasksList: action.payload
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
        currentDayTasks: action.payload
      };
    case ACTION_CHECK_TASK:
      return {
        ...state,
        markedList: action.payload
      };
    case ACTION_ADD_CURRENT_MONTH_TASKS:
      return {
        ...state,
        currentMonthTasks: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;

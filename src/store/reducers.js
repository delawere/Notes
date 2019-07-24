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

const initialState = {
  user: "",
  currentDayDate: "",
  showedTasksList: "all",
  tasks: {},
  currentDayTasks: [],
  markedList: [],
  currentMonthTasks: [],
  cellParametres: { coordinates: { x: 0, y: 0 }, width: 0 },
  popupVisible: false,
  calendarCoordinate: 0
};

const rootReducer = (state = initialState, action) => {
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
    case ACTION_PUT_POPUP_PARAMETRES:
      return {
        ...state,
        cellParametres: action.payload
      };
    case ACTION_SET_CALENDAR_COORDINATE:
      return {
        ...state,
        calendarCoordinate: action.payload
      };
    case ACTION_SET_POPUP_VISIBLE:
      return {
        ...state,
        popupVisible: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;

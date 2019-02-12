import { ACTION_ADD_DATA } from "./action-types";

const initialState = {
  tasks: {
    active: {},
    done: {}
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_DATA:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
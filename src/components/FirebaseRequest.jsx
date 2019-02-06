import fire from "../config/Fire";
import { createStore } from "redux";

const database = fire.database();
const userId = localStorage.getItem("user");

const FirebaseRequest = {};

const setUser = (state = [], action) => {
  if (action.type === "GET_DATA") {
    return [...state, action.payload];
  }
};

const store = createStore(setUser);

store.subscribe(() => {
  console.log("subscribe", store.getState());
});

FirebaseRequest.getData = async () => {
  let result = {};
  const tasks = database.ref(`users/${userId}/tasks`).once("value", snap => {
    result = snap.val() || {};
  });
  await tasks;

  store.dispatch({
    type: 'GET_DATA',
    payload: result
  });

  return result;
};

FirebaseRequest.removeTask = async (key, date) => {
  await database.ref(`users/${userId}/tasks/active/${date}/${key}`).remove();
};

FirebaseRequest.moveTaskToDone = async (text, date) => {
  const dayRef = database.ref(`users/${userId}/tasks/done`).child(date);
  const newTaskKey = dayRef.push().key;
  const update = {};
  update[newTaskKey] = text;
  await dayRef.update(update);
};

export default FirebaseRequest;

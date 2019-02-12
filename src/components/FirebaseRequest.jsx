import fire from "../config/Fire";

const database = fire.database();
const userId = localStorage.getItem("user");
const FirebaseRequest = {};

FirebaseRequest.getData = async () => {
  let result = {};
  const tasks = database.ref(`users/${userId}/tasks`).once("value", snap => {
    result = snap.val() || {};
  });
  await tasks;

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

FirebaseRequest.addNewTask = async (task, date) => {
  if (!task) {
    console.error("You can't add empty task");
  }

  try {
    const dayRef = database.ref(`users/${userId}/tasks/active`).child(date);
    const newTaskKey = dayRef.push().key;
    const update = {};
    update[newTaskKey] = task;
    await dayRef.update(update);
    return newTaskKey;
  } catch (error) {
    console.error(`Add failed. Error: ${error}`);
  }
};

export default FirebaseRequest;

import fire from '../config/Fire';

const database = fire.database();
const userId = localStorage.getItem('user');
const FirebaseRequest = {};

FirebaseRequest.getData = async () => {
  let result = {};
  const tasks = database.ref(`users/${userId}/tasks`).once('value', snap => {
    result = snap.val() || {};
  });
  await tasks;

  return result;
};

FirebaseRequest.removeTask = async (key, date) => {
  await database.ref(`users/${userId}/tasks/${date}/${key}`).remove();
};

FirebaseRequest.addNewTask = async (task, date, type = 'active', callback) => {
  if (!task) {
    console.error("You can't add empty task");
  }

  try {
    const dayRef = database.ref(`users/${userId}/tasks`).child(date);
    const newTaskKey = dayRef.push().key;
    const update = {};
    update[newTaskKey] = {
      task,
      type
    };
    await dayRef.update(update).then(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
    return newTaskKey;
  } catch (error) {
    console.error(`Add failed. Error: ${error}`);
  }
};

FirebaseRequest.moveTaskToDone = async (task, date, type) => {
  try {
    this.addNewTask(task, date, type, () => {
      this.FirebaseRequest.removeTask(task, date);
    });
  } catch (error) {
    console.error(`Move failed. Error: ${error}`);
  }
};

export default FirebaseRequest;

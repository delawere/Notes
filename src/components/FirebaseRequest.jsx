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

FirebaseRequest.upgradeTask = async ({ id, task, date, type = 'active' }) => {
  let key;

  try {
    const dayRef = database.ref(`users/${userId}/tasks`).child(date);

    if (id) {
      key = id;
    } else {
      key = dayRef.push().key;
    }

    const update = {};
    update[key] = {
      task,
      type
    };
    await dayRef.update(update);
    return key;
  } catch (error) {
    console.error(`Upgrade failed. Error: ${error}`);
  }
};

export default FirebaseRequest;

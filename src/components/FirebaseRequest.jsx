import fire from '../config/Fire'

const database = fire.database();

const db = fire.database();
const userId = localStorage.getItem('user');

const FirebaseRequest = {
  updateData: '',
  fetchData: ''
}

/* FirebaseRequest.getTasks = async () => {
  const data = {};

  const taskRef = `users/${userId}/tasks`;
  const tasks = () => {
    return database.ref(taskRef).once('value');
  };

  const res = await Promise.all(tasks);

}; */


/* FirebaseRequest.fetchData = async (days, userId) => {
  try {
    const data = {};
    days.forEach(async (day) => {
      const dayRef = `users/${userId}/time/${day}`;
      const snapshot = await db.ref(dayRef).once('value');
      const { key } = snapshot;
      data[key] = {};
      data[key] = snapshot.val();
    });
    return data;
  } catch(error) {
  } 
}; */

/* FirebaseRequest.updateData = async (day, data, userId) => {
  try {
    const dayRef = `users/${userId}/time/${day}`;
    db.ref(dayRef).update(data);
  } catch(error) {
  }
  
}; */

FirebaseRequest.getData = async () => {
  let result = {};
  const tasks = database.ref(`users/${userId}/tasks`).once('value', snap => {
    result = snap.val() || {};
  });
  await tasks;
  return result
};

FirebaseRequest.addNewTask = async (date, task) => {
  const dayRef = db.ref(`users/${userId}/tasks/`).child(date);
  const newTaskKey = dayRef.push().key;
  const update = {};
  update[newTaskKey] = task;
  await dayRef.update(update);
  this.setState({
    key: newTaskKey
  });
};

export default FirebaseRequest;
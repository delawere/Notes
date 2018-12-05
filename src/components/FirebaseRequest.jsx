import fire from '../config/Fire'

const database = fire.database();

const db = fire.database();
const userId = localStorage.getItem('user');

const FirebaseRequest = {
  updateData: '',
  fetchData: ''
}

FirebaseRequest.getTasks = async () => {
  const data = {};

  const taskRef = `users/${userId}/tasks`;
  const tasks = () => {
    return database.ref(taskRef).once('value');
  };

  const res = await Promise.all(tasks);

  console.log(res);
};


FirebaseRequest.fetchData = async (days, userId) => {
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
};

FirebaseRequest.updateData = async (day, data, userId) => {
  try {
    const dayRef = `users/${userId}/time/${day}`;
    db.ref(dayRef).update(data);
  } catch(error) {
  }
  
};

export default FirebaseRequest;
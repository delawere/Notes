import fire from '../config/Fire'

const db = fire.database();

const FirebaseRequest = {
  updateData: '',
  fetchData: ''
}

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
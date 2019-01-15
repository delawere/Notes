import fire from "../config/Fire";

const database = fire.database();
const userId = localStorage.getItem("user");

const FirebaseRequest = {
  getData: ""
};

FirebaseRequest.getData = async () => {
  let result = {};
  const tasks = database
    .ref(`users/${userId}/tasks`)
    .once("value", snap => {
      result = snap.val() || {};
    });
  await tasks;

  return result;
};

export default FirebaseRequest;

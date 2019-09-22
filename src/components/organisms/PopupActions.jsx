import FirebaseRequest from '../FirebaseRequest';

const PopupActions = {};

PopupActions.refreshDataSet = (newTask, activeTasks) => {
  const { key, task } = newTask;
  activeTasks.push({ key, text: task });

  return { activeTasks };
};

PopupActions.removeTask = async (date, key, tasks) => {
  await FirebaseRequest.removeTask(key, date);
  let currentTasks = [];
  let categoryName = '';
  let removedElemIndex = tasks.findIndex(task => task.key === key);

  currentTasks = tasks;
  categoryName = 'active';

  currentTasks.splice(removedElemIndex, 1);

  return { categoryName, currentTasks };
};

PopupActions.upgradeTask = async parametres => {
  await FirebaseRequest.upgradeTask(parametres);
};

export default PopupActions;

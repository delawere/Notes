import FirebaseRequest from "../FirebaseRequest";

const PopupActions = {};

PopupActions.refreshDataSet = (newTask, activeTasks, active) => {
  const { key, task } = newTask;
  activeTasks.push({ key, text: task });

  return { activeTasks };
};

PopupActions.removeTask = async (date, key, activeTasks) => {
  await FirebaseRequest.removeTask(key, date);
  let currentTasks = [];
  let categoryName = "";
  let removedElemIndex = activeTasks.findIndex(task => task.key === key);

  currentTasks = activeTasks;
  categoryName = "active";

  currentTasks.splice(removedElemIndex, 1);

  return { categoryName, currentTasks };
};

PopupActions.addToMarkedGroup = (markedList, task, checked) => {
  if (checked) {
    markedList.push(task);
  } else {
    const removedElemIndex = markedList.findIndex(it => it.key === task.key);
    markedList.splice(removedElemIndex, 1);
  }
  return markedList;
};

export default PopupActions;

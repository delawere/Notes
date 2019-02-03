import FirebaseRequest from "../FirebaseRequest";

const PopupActions = {};

PopupActions.refreshDataSet = (newTask, activeTasks, doneTasks, active) => {
  const { key, task } = newTask;
  active
    ? activeTasks.push({ key, text: task })
    : doneTasks.push({ key, text: task });

  return { activeTasks, doneTasks };
};

PopupActions.removeTask = async (date, key, activeTasks, doneTasks) => {
  await FirebaseRequest.removeTask(key, date);
  let currentTasks = [];
  let categoryName = "";
  let removedElemIndex = activeTasks.findIndex(task => task.key === key);
  if (removedElemIndex === -1) {
    removedElemIndex = doneTasks.findIndex(task => task.key === key);
    currentTasks = doneTasks;
    categoryName = "doneTask";
  } else {
    currentTasks = activeTasks;
    categoryName = "activeTask";
  }

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

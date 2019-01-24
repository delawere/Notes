import FirebaseRequest from "../FirebaseRequest";

const PopupActions = {};

PopupActions.refreshDataSet = (newTask, activeTasks, doneTasks, active) => {
  const { key, task } = newTask;
  active
    ? activeTasks.push({ key, text: task })
    : doneTasks.push({ key, text: task });

  return { activeTasks, doneTasks };
};

PopupActions.removeTask = async (date, key, activeTasks) => {
  await FirebaseRequest.removeTask(key, date);
  const removedElemIndex = activeTasks.findIndex(task => task.key === key);
  const currentTasks = activeTasks;
  currentTasks.splice(removedElemIndex, 1);

  return currentTasks;
};

PopupActions.addToRemoveGroup = (removeList, key, checked) => {
  if (checked) {
    removeList.push(key);
  } else {
    const removedElemIndex = this.state.removeList.findIndex(
      taskKey => taskKey === key
    );
    removeList.splice(removedElemIndex, 1);
  }
  return removeList;
};


export default PopupActions;

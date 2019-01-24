import React from "react";
import PropTypes from "prop-types";
import PopupListItem from "../molecules/PopupListItem";

const PopupList = ({
  title,
  tasksList,
  onRemove,
  addTaskToRemoveGroup,
  moveTaskToDone
}) => (
  <fieldset>
    <legend>{title}</legend>
    {tasksList.map(({ text, key }) => (
      <PopupListItem
        text={text}
        key={key}
        taskKey={key}
        onRemove={onRemove || ""}
        addTaskToRemoveGroup={addTaskToRemoveGroup || ""}
        moveTaskToDone={moveTaskToDone || ""}
        isLineThrought={title === 'Done' ? true : false}
      />
    ))}
  </fieldset>
);

PopupList.propTypes = {
  title: PropTypes.string,
  tasksList: PropTypes.array,
  onRemove: PropTypes.func,
  addTaskToRemoveGroup: PropTypes.func,
  moveTaskToDone: PropTypes.func
};

export default PopupList;

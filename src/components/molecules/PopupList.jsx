import React from "react";
import PropTypes from "prop-types";
import PopupListItem from "../molecules/PopupListItem";

const PopupList = ({
  tasksList,
  visible,
  onRemove,
  addTaskToMarkedGroup
}) => (
  <fieldset style={{ display: visible ? "flex" : "none" }}>
    {tasksList.map(({ text, key }) => (
      <PopupListItem
        text={text}
        key={key}
        taskKey={key}
        onRemove={onRemove || ""}
        addTaskToMarkedGroup={addTaskToMarkedGroup || ""}
      />
    ))}
  </fieldset>
);

PopupList.propTypes = {
  title: PropTypes.string,
  tasksList: PropTypes.array,
  onRemove: PropTypes.func,
  addTaskToMarkedGroup: PropTypes.func
};

export default PopupList;

import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "../atoms/Button";
import ListItemField from "../atoms/ListItemField";

const Container = styled.div`
  padding: 0.4em 0;
  margin: 0.25em 0;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  cursor: pointer;
  border-bottom: 1px solid rgba(222, 222, 222, 0.4);

  &:hover .ControlButtons {
    opacity: 1;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  opacity: 0;
  justify-content: space-between;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
`;

const buttonTitles = {
  remove: "remove",
  done: "done"
};

class PopupListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMarked: false
    };
  }

  onChecked = (taskKey, checked) => {
    this.setState(
      {
        isMarked: !this.state.isMarked
      },
      this.props.addTaskToMarkedGroup(taskKey, checked)
    );
  };

  render() {
    const {
      text,
      taskKey,
      onRemove,

      isLineThrought
    } = this.props;

    const { done, remove } = buttonTitles;
    return (
      <Container isLineThrought={isLineThrought}>
        <ListItemField
          text={text}
          taskKey={taskKey}
          addTaskToMarkedGroup={this.onChecked}
          isMarked={this.state.isMarked}
          isLineThrought={isLineThrought}
        />
        <ControlButtons className="ControlButtons">
          <Button onClick={onRemove} taskKey={taskKey} title={done} />
          <Button onClick={onRemove} taskKey={taskKey} title={remove} />
        </ControlButtons>
      </Container>
    );
  }
}

export default PopupListItem;

PopupListItem.propTypes = {
  text: PropTypes.string,
  taskKey: PropTypes.string,
  onRemove: PropTypes.func
};

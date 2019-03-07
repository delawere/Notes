import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import DeleteButton from "../atoms/DeleteButton";
import DoneButton from "../atoms/DoneButton";
import ListItemField from "../atoms/ListItemField";

const Container = styled.div`
  padding: 10px 40px;
  margin: 5px 0;
  font-size: 1.1rem;
  display: flex;
  width: 90%;
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
  justify-content: center;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  width: 70px;
`;

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
          <DoneButton onRemove={onRemove} taskKey={taskKey} />
          <DeleteButton onRemove={onRemove} taskKey={taskKey} />
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

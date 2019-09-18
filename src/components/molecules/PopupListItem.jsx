import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ListItemField from '../atoms/ListItemField';
import DeleteButton from '../atoms/DeleteButton';

const Container = styled.div`
  padding: 0.25em 1em;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ControlButtons = styled.div`
  display: flex;
  justify-content: space-between;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
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

  onMouseDownHandler = (event) => {
    console.log(event.target.parentNode);
  }

  render() {
    const {
      text,
      taskKey,
      onRemove,

      isLineThrought
    } = this.props;

    return (
      <Container isLineThrought={isLineThrought} onMouseDown={this.onMouseDownHandler}>
        <ListItemField
          text={text}
          taskKey={taskKey}
          addTaskToMarkedGroup={this.onChecked}
          isMarked={this.state.isMarked}
          isLineThrought={isLineThrought}
        />
        <ControlButtons className="ControlButtons">
          <DeleteButton onClick={onRemove} taskKey={taskKey} />
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

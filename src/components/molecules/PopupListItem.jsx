import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckIcon from '../atoms/CheckIcon';

import ListItemField from '../atoms/ListItemField';
import DeleteButton from '../atoms/DeleteButton';

const Container = styled.div`
  padding: 0.25em 1em;
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  color: #b4b4b4;
  cursor: pointer;
`;

const ControlButtons = styled.div`
  margin-left: auto;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
`;

class PopupListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  onClick = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    const {
      text,
      taskKey,
      type,
      onRemove
    } = this.props;

    const { checked } = this.state;

    return (
      <Container onClick={this.onClick}>
        <CheckIcon visible={checked} />
        <ListItemField text={text} checked={type === 'active' ? true : false} />
        <ControlButtons>
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

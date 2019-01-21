import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import fire from "../../config/Fire";

import AddField from "../atoms/AddField";
import AddButton from "../atoms/AddButton";

const db = fire.database();
const userId = localStorage.getItem("user");

const placeholder = "Enter what you want to do";

const AddFormContainer = styled.div`
  width: 90%;
  heigth: 50px;
  margin-top: 15px;
  display: flex;
  align-items: flex-end;
`;

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      key: "",
      inFocus: false
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewTask = async () => {
    if (this.state.task) {
      try {
        const dayRef = db
          .ref(`users/${userId}/tasks/active`)
          .child(this.props.date);
        const newTaskKey = dayRef.push().key;
        const update = {};
        update[newTaskKey] = this.state.task;
        await dayRef.update(update);
        this.setState(
          {
            key: newTaskKey
          },
          () => {
            this.props.refreshDataSet(this.state, true);
          }
        );
      } catch (error) {
        console.error(`Add failed. Error: ${error}`);
      }

      this.setState({
        task: ""
      });
    } else {
      console.error(`You can't add empty task`);
    }
  };

  onFocusAddField = () => {
    this.setState({ inFocus: !this.state.inFocus });
  };

  render() {
    return (
      <AddFormContainer>
        <AddField
          name="task"
          onChange={this.onChangeInput}
          value={this.state.task}
          placeholder={placeholder}
          addNewTask={this.addNewTask}
          onFocusAddField={this.onFocusAddField}
          inFocus={this.state.inFocus}
        />
        <AddButton addNewTask={this.addNewTask} />
      </AddFormContainer>
    );
  }
}

AddForm.propTypes = {
  date: PropTypes.string,
  refreshDataSet: PropTypes.func
};

export default AddForm;

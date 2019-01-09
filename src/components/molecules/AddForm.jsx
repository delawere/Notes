import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import fire from "../../config/Fire";

import AddField from "../atoms/AddField";
import AddButton from "../atoms/AddButton";
import RadioGroup from "../molecules/RadioGroup";

const db = fire.database();
const userId = localStorage.getItem("user");

const AddFormContainer = styled.div`
  width: 90%;
  heigth: 50px;
  margin-top: 15px;
  display: flex;
`;

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      key: ""
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewTask = async () => {
    if (this.state.task) {
      try {
        const dayRef = db.ref(`users/${userId}/tasks/`).child(this.props.date);
        const newTaskKey = dayRef.push().key;
        const update = {};
        update[newTaskKey] = this.state.task;
        await dayRef.update(update);
        this.setState(
          {
            key: newTaskKey
          },
          () => {
            this.props.refreshDataSet(this.state);
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

  render() {
    return (
      <AddFormContainer>
{/*         <RadioGroup /> */}
        <AddField
          name="task"
          onChange={this.onChangeInput}
          value={this.state.task}
          addNewTask={this.addNewTask}
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

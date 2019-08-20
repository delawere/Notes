import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FirebaseRequest from "../FirebaseRequest";
import { connect } from "react-redux";
import { addCurrentDayTasks } from "../../store/actions";
import { bindActionCreators } from "redux";

import AddField from "../atoms/AddField";
import AddButton from "../atoms/AddButton";

const placeholder = "Enter what you want to do";

const AddFormContainer = styled.div`
  margin-top: 2.5em;
  display: flex;
  align-items: flex-end;
  height: 10em;
  width: 30em;
`;

const putActionsToProps = dispatch => {
  return {
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
  };
};

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      inFocus: false
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewTask = async () => {
    const { task } = this.state;
    const { date, refreshDataSet } = this.props;
    const key = await FirebaseRequest.addNewTask(task, date);
    await refreshDataSet({
        task,
        key
      },
      true
    );
    this.setState({
      task: ""
    });
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
        <AddButton addNewTask={this.addNewTask} title="Add" />
      </AddFormContainer>
    );
  }
}

AddForm = connect(null, putActionsToProps)(AddForm);

AddForm.propTypes = {
  date: PropTypes.string,
  refreshDataSet: PropTypes.func
};

export default AddForm;

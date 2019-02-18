import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "./components/templates/Form";
import Home from "./components/templates/Home";
import { addTasks, addCurrentDayTasks, addCurrentDayDate } from "./store/actions";

const putStateToProps = state => {
  return {
    addCurrentDayDate: state.currentDayDate,
    tasks: {
      active: state.tasks.active,
      done: state.tasks.done,
    },
    currentDayTasks: {
      active: state.currentDayTasks.active,
      done: state.currentDayTasks.done
    }
  };
};

const putActionsToProps = dispatch => {
  return {
    addTasks: bindActionCreators(addTasks, dispatch),
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addCurrentDayDate: bindActionCreators(addCurrentDayDate, dispatch),
  };
};

const WrappedHomeComponent = connect(
  putStateToProps,
  putActionsToProps
)(Home);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({
        user
      });
    } else {
      this.authListener();
    }
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (<WrappedHomeComponent currentUser={this.state.user} />) : ( <Form />)}
      </div>
    );
  }
}

export default App;

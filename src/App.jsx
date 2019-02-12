import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "./components/templates/Form";
import Home from "./components/templates/Home";
import addTasks from "./store/actions";

const putStateToProps = state => {
  return {
    active: state.tasks.active,
    done: state.tasks.done
  };
};

const putActionsToProps = dispatch => {
  return {
    addTasks: bindActionCreators(addTasks, dispatch)
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

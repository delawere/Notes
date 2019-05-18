import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "./components/templates/Form";
import Home from "./components/templates/Home";
import {
  addUser,
  addTasks,
  addCurrentDayTasks,
  addCurrentDayDate,
  putPopupCoordinates,
  setPopupVisible
} from "./store/actions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LANDING, LOGIN } from "./router/constants";

const putStateToProps = state => {
  return {
    user: state.user,
    addCurrentDayDate: state.currentDayDate,
    currentDayDate: state.currentDayDate,
    tasks: {
      active: state.tasks
    },
    currentDayTasks: {
      active: state.currentDayTasks
    },
    popupVisible: state.popupVisible
  };
};

const putActionsToProps = dispatch => {
  return {
    addUser: bindActionCreators(addUser, dispatch),
    addTasks: bindActionCreators(addTasks, dispatch),
    addCurrentDayTasks: bindActionCreators(addCurrentDayTasks, dispatch),
    addCurrentDayDate: bindActionCreators(addCurrentDayDate, dispatch),
    putPopupCoordinates: bindActionCreators(putPopupCoordinates, dispatch),
    setPopupVisible: bindActionCreators(setPopupVisible, dispatch)
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
      this.props.addUser(user);
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
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={LANDING}
            render={() => (
              <WrappedHomeComponent currentUser={this.state.user} />
            )}
          />
          <Route path={LOGIN} component={Form} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App = connect(
  null,
  putActionsToProps
)(App);

export default App;

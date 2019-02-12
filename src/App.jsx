import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import Form from "./components/templates/Form";
import Home from "./components/templates/Home";
import rootReducer from "./store/reducers";
import addTasks from "./store/actions";

export const store = createStore(rootReducer);

const putStateToProps = state => {
  return {
    active: state.tasks.active,
    done: state.tasks.done,
  }
}

const putActionsToProps = (dispatch) => {
  return {
    addTasks: bindActionCreators(addTasks, dispatch)
  };
}

const WrappedHomeComponent = connect(putStateToProps, putActionsToProps)(Home);

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
        {this.state.user ? <Provider store={store}><WrappedHomeComponent currentUser = {this.state.user} /></Provider> : <Form />}
      </div>
    );
  }
}

export default App;

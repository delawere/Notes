import React, { Component } from "react";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import Popup from "./Popup";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AsideContainer = styled.aside`
  width: 100%;
  margin-top: 2em;
  margin: 0 auto;
  display: flex;
`;

const putStateToProps = state => {
  return {
    activeTasks: state.tasks
  };
};

class AsideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTasks: {}
    };
  }

  static getDerivedStateFromProps(props) {
    const { activeTasks } = props;
    return {
      activeTasks
    };
  }

  render() {
    const { activeTasks, onAfterSubmit } = this.props;
    return (
      <AsideContainer>
        <UserSchedule
          onClickDay={this.props.onClickDay}
          activeTasks={activeTasks}
        />
        <Popup onAfterSubmit={onAfterSubmit}/>
      </AsideContainer>
    );
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object
};

AsideMenu = connect(putStateToProps)(AsideMenu);

export default AsideMenu;

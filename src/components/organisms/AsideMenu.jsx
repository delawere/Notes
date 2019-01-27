import React, { Component } from "react";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import PropTypes from "prop-types";
import UserInfo from "../molecules/UserInfo";

const AsideContainer = styled.aside`
  width: 15vw;
  position: absolute;
  background: #fff;
  top: 120px;
  left: 15px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

class AsideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTasks: {},
      doneTasks: {}
    };
  }

  static getDerivedStateFromProps(props) {
    const { activeTasks, doneTasks } = props;
    return {
      activeTasks,
      doneTasks
    };
  }

  render() {
    const { activeTasks, doneTasks } = this.state;
    return (
      <AsideContainer>
        {/* <UserInfo /> */}
        <UserSchedule
          onClickDay={this.props.onClickDay}
          activeTasks={activeTasks}
          doneTasks={doneTasks}
        />
      </AsideContainer>
    );
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object,
  doneTasks: PropTypes.object
};

export default AsideMenu;

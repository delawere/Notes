import React, { Component } from "react";
import fire from "../../config/Fire";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import PropTypes from "prop-types";
import UserInfo from "../molecules/UserInfo";

const AsideContainer = styled.aside`
  height: 100%;
  width: 15vw;
  position: fixed;
  /*   background: #242425; */
  background: #fff;
  top: 0;
  left: 0;
  border-right: 1px solid #a8a8a8;
`;

class AsideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: {}
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      tasks: props.usersData
    };
  }

  render() {
    return (
      <AsideContainer>
        <UserInfo />
        <UserSchedule
          onClickDay={this.props.onClickDay}
          usersData={this.state.tasks}
        />
      </AsideContainer>
    );
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func,
  usersData: PropTypes.object
};

export default AsideMenu;

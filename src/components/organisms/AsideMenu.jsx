import React, { Component } from "react";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AsideContainer = styled.aside`
  flex: 1;
  max-width: 300px;
  height: 300px;
  margin-top: 25px;
  margin-bottom: 35px;
  margin-right: 50px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  justify-self: self-end;
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
    const { activeTasks } = this.props;
    return (
      <AsideContainer>
        <UserSchedule
          onClickDay={this.props.onClickDay}
          activeTasks={activeTasks}
        />
      </AsideContainer>
    );
  }
}

AsideMenu.propTypes = {
  onClickDay: PropTypes.func,
  activeTasks: PropTypes.object,
};

AsideMenu = connect(putStateToProps)(AsideMenu);

export default AsideMenu;

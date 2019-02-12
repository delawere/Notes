import React, { Component } from "react";
import styled from "styled-components";
import UserSchedule from "./UserSchedule";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AsideContainer = styled.aside`
  width: 15vw;
  min-height: 700px;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  justify-self: self-end;
`;

const putStateToProps = state => {
  return {
    activeTasks: state.tasks.active,
    doneTasks: state.tasks.done
  };
};

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

AsideMenu = connect(putStateToProps)(AsideMenu);

export default AsideMenu;

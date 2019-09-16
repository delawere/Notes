import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fire from '../../config/Fire';
import { addUser } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const UserInfoContainer = styled.div`
  color: #0070c9;
  cursor: pointer;
  border: none;
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const putActionToProps = dispatch => {
  return {
    addUser: bindActionCreators(addUser, dispatch)
  };
};

class UserControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userEmail: ''
    };
  }

  componentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        const userName = userEmail.substring(0, userEmail.search('@'));

        this.setState({
          userName,
          userEmail
        });
      }
    });
  }

  logout = () => {
    localStorage.removeItem('user');
    fire.auth().signOut();

    this.props.addUser('');
  };

  render() {
    return (
      <UserInfoContainer>
        <UserName onClick={this.logout}>Log out {this.state.userName}</UserName>
      </UserInfoContainer>
    );
  }
}

UserControl = connect(
  null,
  putActionToProps
)(UserControl);

UserControl.propTypes = {
  addUser: PropTypes.func
};

export default UserControl;

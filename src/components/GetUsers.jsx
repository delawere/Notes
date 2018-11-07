import React, { PureComponent } from 'react';
import fire from '../config/Fire';

import UsersItem from './UsersItem';

class GetUsers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      usersData: []
    }

  this.database = fire.database();
  }

  
  async componentDidMount() {
    const users = await this.fetchAccounts();
    this.setState({ 'usersData': users });
  }

  async fetchAccounts () {
    const data = [];
    const tasks = this.database.ref('users/').once('value');
    const res = await tasks;

    res.forEach(snapshot => {
      data.push(snapshot.val() || {});
    });
    return data;
  }

  render() {
    return(
      <div>
        {this.state.usersData.map(currentUser => (
            <UsersItem 
              key = {currentUser.name}
              name = {currentUser.name}
            />
       ))}
      </div>
    )
  }
}

export default GetUsers;


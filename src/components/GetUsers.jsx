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
      let currentValue = snapshot.val() || {};
      currentValue.key = snapshot.key;
      data.push(currentValue);
    });
    return data;
  }

  render() {
    return(
      <div>
        {this.state.usersData.map(user => (
            <UsersItem 
              id = {user.key}
              key = {user.key}
              name = {`${user.name} ${user.surname}`} 
              time = {user.time}
            />
       ))}
      </div>
    )
  }
}

export default GetUsers;


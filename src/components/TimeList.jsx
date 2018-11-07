import React, { Component } from 'react';
import TimeListItem from './TimeListItem';

class TimeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    let arr = [];
    let count = nextProps.lastItem.split(':')[0] - nextProps.firstItem.split(':')[0];
    for (let i = 0; i < count; i++) {
      arr.push(+(nextProps.firstItem.split(':')[0]) + i)
    }
    this.setState({
      items: arr
    })
  }

  render() {
    return (
      <div>
        {this.state.items.map((it, i) => 
          <TimeListItem value={it}/>
        )}
      </div>
    )  
  }

}


export default TimeList;
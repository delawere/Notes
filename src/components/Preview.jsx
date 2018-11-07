import React, { PureComponent } from 'react';

import TimeList from './TimeList';

class Preview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      begin: '',
      end: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.begin > nextProps.timeLimit.beginTime || this.state.begin === '') {
      this.setState({
        begin: nextProps.timeLimit.beginTime
      });
    };
    if (this.state.end < nextProps.timeLimit.endTime || this.state.end === '') {
      this.setState({
        end: nextProps.timeLimit.endTime,
      });
    };
  }

  render() {
    return (
      <div>
        <TimeList firstItem={this.state.begin} lastItem={this.state.end} />
      </div>
      
    );
  }
}

export default Preview;
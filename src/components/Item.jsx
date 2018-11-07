import React, { PureComponent } from 'react';
import fire from '../config/Fire';
import FirebaseRequest from './FirebaseRequest';
import styled from 'styled-components';

const Input = styled.input `
  background: transparent;
  border-radius: 3px;
  border: 1px solid #c4c4c4;
  color: #c4c4c4;
  width: 60%;
  padding: 0.25em;
`

class Item extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      to: '',
      from: '',
      confirmStatus: true,
      isDisabled: false,
    };
  }

  updateTime = async () => {
    let userId = fire.auth().currentUser.uid;
    const { from, to } = this.state;
    const { weekday } = this.props;
    try {
      FirebaseRequest.updateData(weekday, { from, to }, userId);
    } catch(err) {
      console.error(err);
    }
    this.setState({
      isDisabled: false,
    });
  };

  onUpdateTimeBtnClick = async (e) => {
    e.preventDefault();
    this.setState({
      confirmStatus: !this.state.confirmStatus,
      isDisabled: true,
    }, () => this.updateTime());
  };

  onToChange = (e) => {
    const { target: { value } } = e;
    this.setState({ to: value });
  };

  onFromChange = (e) => {
    const { target: { value } } = e;
    this.setState({ from: value });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        to: this.props.to || '',
        from: this.props.from || ''
      });
    }
    return; 
  };

  render() {
    return (
      <div className="row pb-4">
        <p className="col-2 mr-sm-4 mb-sm-0 text-left">{this.props.weekday}</p>
        <label className="mr-sm-2">От</label>
        <div className="col-sm-2">
          <Input
            name="from"
            type="time"
            id="time-input"
            value={this.state.to}
            onChange={this.onToChange}
            disabled={this.state.isDisabled}
          />
        </div>

        <label className="mr-sm-2">До</label>
        <div className="col-sm-2">
          <Input
            name="to"
            type="time"
            id="time-input"
            value={this.state.from}
            onChange={this.onFromChange}
            disabled={this.state.isDisabled}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary col-2"
          id="edit-btn"
          onClick={this.onUpdateTimeBtnClick}
        >
          Редактировать
        </button>
      </div>
    );
  }
}

export default Item;

      
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import person from '../person.svg';

import UserSchedule from './UserSchedule';

const Wrapper = styled.div `
  width: 225px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  text-align: left;
  vertical-align: middle;
  padding: 1em;
  margin-bottom: 0.5em;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`

const ImageContainer = styled.div `
  display: inline-block;
  width: 20%;
`
const TitleContainer = styled.div `
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  width: 80%;
  font-weight: bold;
`

const Image = styled.img `
  width: 40px;
  heigth: 40px;
  background-color: rgba(217, 217, 217, 0.35);
  border-radius: 3px; 
`

class UsersItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      id: '',
      visible: false
    }
  };

  componentDidMount() {
    const { id, name } = this.props;
    this.setState({
      name: name,
      id: id,
    });
  }

  handleClick = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    return(
      <div> 
        <Wrapper onClick={this.handleClick}>
          <ImageContainer>
            <Image src={person} alt="" />
          </ImageContainer>
          <TitleContainer>
            <span>
              {this.state.name} 
            </span>
          </TitleContainer>
        </Wrapper>
        <UserSchedule time = {this.props.time}
                      visible = {this.state.visible}
        />
      </div>
    );
  }
}

export default UsersItem;
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Item = styled.li`
  display: inline;
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border-radius: 3px;
  cursor: pointer;

  border: ${props => (props.active ? '1px solid #337ab7;' : 'none')};
`;

const ShowListButton = ({ text, active, hideList }) => (
  <Item
    onClick={e => hideList(e.target.textContent.toLowerCase())}
    active={active}
  >
    <a>{text}</a>
  </Item>
);

ShowListButton.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  hideList: PropTypes.func
};

export default ShowListButton;

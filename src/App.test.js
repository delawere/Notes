import React from 'react';
import ReactDOM from 'react-dom';
import AddButton from './components/atoms/AddButton';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

/* it('renders without crashing', () => {
  const button = document.createElement('button');
  ReactDOM.render(<AddButton />, button);
  ReactDOM.unmountComponentAtNode(button);
}); */

// React 16 Enzyme adapter
/* Enzyme.configure({ adapter: new Adapter() });


describe('AddButton', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AddButton title="mockTitle"/>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
}); */

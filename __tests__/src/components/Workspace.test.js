import React from 'react';
import { shallow } from 'enzyme';
import { store } from '../../../src/store';
import Workspace from '../../../src/components/Workspace';

describe('Workspace', () => {
  it('renders without an error', () => {
    const wrapper = shallow(<Workspace store={store} />).dive();
    expect(wrapper.find('div.mirador-workspace').length).toBe(1);
    expect(wrapper.find('div.window').length).toBe(0);
    // expect(wrapper.find('button').length).toBe(1);
    // expect(wrapper.find('button').text()).toEqual('http://example.com');
  });
  // it('updates and adds window div when window is added to store', () => {
  //   const wrapper = shallow(<Workspace store={store} />).dive();
  //   expect(store.getState().windows.length).toEqual(0);
  //   wrapper.find('button').simulate('click');
  //   expect(store.getState().windows.length).toEqual(1);
  // });
});

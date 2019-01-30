import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import { WindowSideBar } from '../../../src/components/WindowSideBar';

describe('WindowSideBar', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    wrapper = shallow(<WindowSideBar store={store} windowId="1" classes={{}} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('.mirador-window-sidebar').length).toBe(1);
    expect(wrapper.find('WithStyles(List)').length).toBe(1);
  });
});

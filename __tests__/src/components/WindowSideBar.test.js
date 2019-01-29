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
    expect(wrapper.find('WithStyles(Drawer)').length).toBe(1);
  });
});

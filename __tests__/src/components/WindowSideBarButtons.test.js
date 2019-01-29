import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

describe('WindowSideBarButtons', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    wrapper = shallow(<WindowSideBarButtons store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

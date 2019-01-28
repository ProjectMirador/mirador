import React from 'react';
import { shallow } from 'enzyme';
import { store } from '../../../src/store';
import { WindowSideBarButtons } from '../../../src/components/WindowSideBarButtons';

describe('WindowSideBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBarButtons store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

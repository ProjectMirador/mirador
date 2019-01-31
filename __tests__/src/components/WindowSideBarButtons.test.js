import React from 'react';
import { shallow } from 'enzyme';
import WindowSideBarButtons from '../../../src/components/WindowSideBarButtons';

describe('WindowSideBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowSideBarButtons />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import WindowTopBarButtons from '../../../src/components/WindowTopBarButtons';

describe('WindowTopBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowTopBarButtons />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

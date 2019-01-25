import React from 'react';
import { shallow } from 'enzyme';
import { store } from '../../../src/store';
import { WindowTopBarButtons } from '../../../src/components/WindowTopBarButtons';

describe('WindowTopBarButtons', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WindowTopBarButtons store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

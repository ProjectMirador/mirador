import React from 'react';
import { shallow } from 'enzyme';
import createStore from '../../../src/state/createStore';
import { WindowTopBarButtons } from '../../../src/components/WindowTopBarButtons';

describe('WindowTopBarButtons', () => {
  let wrapper;
  const store = createStore();
  beforeEach(() => {
    wrapper = shallow(<WindowTopBarButtons store={store} />);
  });

  it('renders without an error', () => {
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});

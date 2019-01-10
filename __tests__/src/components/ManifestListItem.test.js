import React from 'react';
import { shallow } from 'enzyme';
import { store } from '../../../src/store';
import ManifestListItem from '../../../src/components/ManifestListItem';

describe('ManifestListItem', () => {
  it('renders without an error', () => {
    const wrapper = shallow(<ManifestListItem manifest="http://example.com" store={store} />).dive();
    expect(wrapper.find('li.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toEqual('http://example.com');
  });
  it('updates and adds window when button clicked', () => {
    const wrapper = shallow(<ManifestListItem manifest="http://example.com" store={store} />).dive();
    expect(store.getState().windows.length).toEqual(0);
    wrapper.find('button').simulate('click');
    expect(store.getState().windows.length).toEqual(1);
  });
});

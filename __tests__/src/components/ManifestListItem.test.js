import React from 'react';
import { shallow } from 'enzyme';
import { ManifestListItem } from '../../../src/components/ManifestListItem';

describe('ManifestListItem', () => {
  it('renders without an error', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifest="http://example.com" addWindow={addWindow} />,
    );
    expect(wrapper.find('li.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toEqual('http://example.com');
  });
  it('updates and adds window when button clicked', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifest="http://example.com" addWindow={addWindow} />,
    );
    wrapper.find('button').simulate('click');
    expect(addWindow).toHaveBeenCalledTimes(1);
  });
});

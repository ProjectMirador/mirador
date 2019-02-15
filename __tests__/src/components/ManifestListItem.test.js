import React from 'react';
import { shallow } from 'enzyme';
import ManifestListItem from '../../../src/components/ManifestListItem';

describe('ManifestListItem', () => {
  it('renders without an error', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem
        manifestId="http://example.com"
        title="xyz"
        ready
        addWindow={addWindow}
        t={t => t}
      />,
    ).dive();
    expect(wrapper.find('.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find('WithStyles(ButtonBase)').length).toBe(1);
    expect(wrapper.find('WithStyles(ButtonBase) WithStyles(Typography)').children().text()).toEqual('xyz');
  });
  it('renders a placeholder element until real data is available', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifestId="http://example.com" addWindow={addWindow} />,
    ).dive();
    expect(wrapper.find('.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find('ReactPlaceholder').length).toBe(1);
  });
  it('updates and adds window when button clicked', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifestId="http://example.com" title="xyz" addWindow={addWindow} />,
    ).dive();
    wrapper.find('WithStyles(ButtonBase)').simulate('click');
    expect(addWindow).toHaveBeenCalledTimes(1);
  });
  it('uses the manifest id if the title is not available', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifestId="http://example.com" ready addWindow={addWindow} />,
    ).dive();
    expect(wrapper.find('WithStyles(ButtonBase)').length).toBe(1);
    expect(wrapper.find('WithStyles(ButtonBase) WithStyles(Typography)').children().text()).toEqual('http://example.com');
  });

  it('displays the provider information', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifestId="http://example.com" ready provider="ACME" addWindow={addWindow} />,
    ).dive();
    expect(wrapper.find('WithStyles(Typography).mirador-manifest-list-item-provider').children().text()).toEqual('ACME');
  });

  it('displays a placeholder provider if no information is given', () => {
    const addWindow = jest.fn();
    const wrapper = shallow(
      <ManifestListItem manifestId="http://example.com" ready addWindow={addWindow} />,
    ).dive();
    expect(wrapper.find('WithStyles(Typography).mirador-manifest-list-item-provider').children().text()).toEqual('addedFromUrl');
  });
});

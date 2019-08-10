import React from 'react';
import { shallow } from 'enzyme';
import ButtonBase from '@material-ui/core/ButtonBase';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { ManifestListItem } from '../../../src/components/ManifestListItem';
import ManifestListItemError from '../../../src/containers/ManifestListItemError';

/** */
function createWrapper(props) {
  return shallow(
    <ManifestListItem
      manifestId="http://example.com"
      title="xyz"
      ready
      addWindow={() => {}}
      fetchManifest={() => {}}
      t={t => t}
      {...props}
    />,
  );
}

describe('ManifestListItem', () => {
  it('renders without an error', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find(ButtonBase).length).toBe(1);
    expect(wrapper.find(ButtonBase).find(Typography).children().text()).toEqual('xyz');
  });
  it('adds a class when the item is active', () => {
    const wrapper = createWrapper({ active: true, classes: { active: 'active' } });
    expect(wrapper.find('.active').length).toEqual(1);
  });
  it('renders a placeholder element until real data is available', () => {
    const wrapper = createWrapper({ ready: false });

    expect(wrapper.find('.mirador-manifest-list-item').length).toBe(1);
    expect(wrapper.find('WithStyles(ForwardRef(Skeleton))').length > 0).toBe(true);
  });
  it('renders an error message if fetching the manifest failed', () => {
    const wrapper = createWrapper({ error: 'This is an error message' });

    expect(wrapper.find(ListItem).length).toBe(1);
    expect(wrapper.find(ManifestListItemError).length).toBe(1);
  });
  it('updates and adds window when button clicked', () => {
    const addWindow = jest.fn();
    const wrapper = createWrapper({ addWindow });
    wrapper.find(ButtonBase).simulate('click');
    expect(addWindow).toHaveBeenCalledTimes(1);
  });
  it('uses the manifest id if the title is not available', () => {
    const wrapper = createWrapper({ ready: true, title: null });

    expect(wrapper.find(ButtonBase).length).toBe(1);
    expect(wrapper.find(ButtonBase).find(Typography).children().text()).toEqual('http://example.com');
  });

  it('displays the provider information', () => {
    const wrapper = createWrapper({ provider: 'ACME' });
    expect(wrapper.find('.mirador-manifest-list-item-provider').children().text()).toEqual('ACME');
  });

  it('displays a placeholder provider if no information is given', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-manifest-list-item-provider').children().text()).toEqual('addedFromUrl');
  });
});

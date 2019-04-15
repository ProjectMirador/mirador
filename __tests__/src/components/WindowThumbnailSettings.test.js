import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { WindowThumbnailSettings } from '../../../src/components/WindowThumbnailSettings';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowThumbnailSettings
      classes={{}}
      windowId="xyz"
      setWindowThumbnailPosition={() => {}}
      thumbnailNavigationPosition="off"
      {...props}
    />,
  );
}

describe('WindowThumbnailSettings', () => {
  it('renders all elements correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(ListSubheader).length).toBe(1);
    const labels = wrapper.find(FormControlLabel);
    expect(labels.length).toBe(3);
    expect(labels.at(0).props().value).toBe('off');
    expect(labels.at(1).props().value).toBe('far-bottom');
    expect(labels.at(2).props().value).toBe('far-right');
  });

  it('should set the correct label active (by setting the primary color)', () => {
    let wrapper = createWrapper({ thumbnailNavigationPosition: 'far-bottom' });
    expect(wrapper.find(FormControlLabel).at(1).props().control.props.color).toEqual('primary');
    expect(wrapper.find(FormControlLabel).at(2).props().control.props.color).not.toEqual('primary');

    wrapper = createWrapper({ thumbnailNavigationPosition: 'far-right' });
    expect(wrapper.find(FormControlLabel).at(2).props().control.props.color).toEqual('primary');
  });

  it('updates state when the thumbnail config selection changes', () => {
    const setWindowThumbnailPosition = jest.fn();
    const wrapper = createWrapper({ setWindowThumbnailPosition });

    wrapper.find(MenuItem).at(0).simulate('click');
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'off');
    wrapper.find(MenuItem).at(2).simulate('click');
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'far-right');
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { WindowThumbnailSettings } from '../../../src/components/WindowThumbnailSettings';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowThumbnailSettings
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
    expect(wrapper.find(Typography).length).toBe(1);
    expect(wrapper.find(RadioGroup).length).toBe(1);
    const labels = wrapper.find(FormControlLabel);
    expect(labels.length).toBe(3);
    expect(labels.at(0).props().value).toBe('off');
    expect(labels.at(1).props().value).toBe('bottom');
    expect(labels.at(2).props().value).toBe('right');
  });

  it('should set the correct label active', () => {
    let wrapper = createWrapper({ thumbnailNavigationPosition: 'bottom' });
    expect(wrapper.find(RadioGroup).props().value).toBe('bottom');
    wrapper = createWrapper({ thumbnailNavigationPosition: 'right' });
    expect(wrapper.find(RadioGroup).props().value).toBe('right');
  });

  it('updates state when the thumbnail config selection changes', () => {
    const setWindowThumbnailPosition = jest.fn();
    const wrapper = createWrapper({ setWindowThumbnailPosition });
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 'off' } });
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'off');
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 'right' } });
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'right');
  });
});

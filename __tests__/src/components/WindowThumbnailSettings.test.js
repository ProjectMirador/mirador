import React from 'react';
import { shallow } from 'enzyme';
import WindowThumbnailSettings from '../../../src/components/WindowThumbnailSettings';

describe('WindowThumbnailSettings', () => {
  let wrapper;
  const setWindowThumbnailPosition = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <WindowThumbnailSettings
        windowId="xyz"
        setWindowThumbnailPosition={setWindowThumbnailPosition}
        thumbnailNavigationPosition="bottom"
      />,
    );
  });

  it('renders without an error', () => {
    expect(wrapper.find('WithStyles(Typography)').dive().dive().text()).toBe('Thumbnails');
    expect(wrapper.find('RadioGroup').props().value).toBe('bottom');
  });

  it('updates state when the thumbnail config selection changes', () => {
    wrapper.find('RadioGroup').first().simulate('change', { target: { value: 'off' } });
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'off');
  });
});

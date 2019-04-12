import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryWindow } from '../../../src/components/PrimaryWindow';
import WindowSideBar from '../../../src/containers/WindowSideBar';
import WindowViewer from '../../../src/containers/WindowViewer';
import GalleryView from '../../../src/containers/GalleryView';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <PrimaryWindow
      windowId="window-1"
      manifest={{}}
      {...props}
    />,
  );
}

describe('PrimaryWindow', () => {
  it('should render outer element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-primary-window')).toHaveLength(1);
  });
  it('should render <WindowSideBar>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowSideBar)).toHaveLength(1);
  });
  it('should render <WindowViewer> if manifest is present', () => {
    const manifest = { id: 456, isFetching: false };
    const wrapper = createWrapper({ manifest });
    expect(wrapper.find(WindowViewer)).toHaveLength(1);
  });
  it('should render <GalleryView> if manifest is present and view is gallery', () => {
    const manifest = { id: 456, isFetching: false };
    const wrapper = createWrapper({ manifest, view: 'gallery', windowId: 'window-2' });
    expect(wrapper.find(GalleryView)).toHaveLength(1);
  });
});

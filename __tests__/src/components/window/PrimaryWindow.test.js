import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryWindow } from '../../../../src/components/window/PrimaryWindow';
import WindowSideBar from '../../../../src/containers/window/WindowSideBar';
import WindowViewer from '../../../../src/containers/window/WindowViewer';
import GalleryView from '../../../../src/containers/window/GalleryView';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <PrimaryWindow
      window={{ id: 'window-1' }}
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
    const window = { id: 'window-2', view: 'gallery' };
    const wrapper = createWrapper({ manifest, window });
    expect(wrapper.find(GalleryView)).toHaveLength(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryWindow } from '../../../src/components/PrimaryWindow';
import WindowSideBar from '../../../src/containers/WindowSideBar';
import WindowViewer from '../../../src/containers/WindowViewer';
import GalleryView from '../../../src/containers/GalleryView';
import CollectionDialog from '../../../src/containers/CollectionDialog';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <PrimaryWindow
      classes={{}}
      windowId="window-1"
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
  it('should render nothing if manifest is still f etching', () => {
    const wrapper = createWrapper({ isFetching: true });
    expect(wrapper.find(WindowViewer)).toHaveLength(0);
  });
  it('should render <WindowViewer> if manifest is present', () => {
    const wrapper = createWrapper({ isFetching: false });
    expect(wrapper.find(WindowViewer)).toHaveLength(1);
  });
  it('should render <GalleryView> if manifest is present and view is gallery', () => {
    const wrapper = createWrapper({ isFetching: false, view: 'gallery', windowId: 'window-2' });
    expect(wrapper.find(GalleryView)).toHaveLength(1);
  });
  it('should render <CollectionDialog> and <SelectCollection> if manifest is collection and isCollectionDialogVisible', () => {
    const wrapper = createWrapper({ isCollection: true, isCollectionDialogVisible: true });
    const lazyComponent = wrapper.find('lazy');
    expect(lazyComponent.type().displayName).toBe('SelectCollection');
    expect(wrapper.find(CollectionDialog)).toHaveLength(1);
  });
});

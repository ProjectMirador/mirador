import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryWindow } from '../../../src/components/PrimaryWindow';
import WindowSideBar from '../../../src/containers/WindowSideBar';
import WindowViewer from '../../../src/containers/WindowViewer';

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

describe('WindowMiddleContent', () => {
  it('should render outer element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-primary-window').length).toBe(1);
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
  it('should not render <WindowViewer> if manifest isn\'t present', () => {
    const manifest = { id: 456, isFetching: true };
    const wrapper = createWrapper({ manifest });
    expect(wrapper.find(WindowViewer)).toHaveLength(0);
  });
});

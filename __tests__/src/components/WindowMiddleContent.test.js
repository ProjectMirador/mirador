import React from 'react';
import { shallow } from 'enzyme';
import { WindowMiddleContent } from '../../../src/components/WindowMiddleContent';
import CompanionArea from '../../../src/containers/CompanionArea';
import WindowSideBar from '../../../src/containers/WindowSideBar';
import WindowViewer from '../../../src/containers/WindowViewer';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowMiddleContent
      companionWindowIds={['cw1', 'cw-2']}
      window={{ id: 'window-1' }}
      manifest={{}}
      {...props}
    />,
  );
}

describe('WindowMiddleContent', () => {
  it('should render outer element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-window-middle-content')).toHaveLength(1);
  });
  it('should render all <CompanionWindow> components', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionArea)).toHaveLength(1);
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
});

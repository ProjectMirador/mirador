import React from 'react';
import { shallow } from 'enzyme';
import { WindowCanvasNavigationControls } from '../../../src/components/WindowCanvasNavigationControls';
import ViewerInfo from '../../../src/containers/ViewerInfo';
import ViewerNavigation from '../../../src/containers/ViewerNavigation';
import ZoomControls from '../../../src/containers/ZoomControls';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowCanvasNavigationControls
      canvases={[]}
      canvasLabel="label"
      window={{}}
      {...props}
    />,
  );
}

describe('WindowCanvasNavigationControls', () => {
  let wrapper;

  it('renders properly', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement(
      <div>
        <ZoomControls />
        <ViewerNavigation />
        <ViewerInfo />
      </div>,
    )).toBe(true);
  });

  it('renders nothing when visible=false', () => {
    wrapper = createWrapper({ visible: false });
    expect(wrapper.matchesElement(<></>)).toBe(true);
  });
});

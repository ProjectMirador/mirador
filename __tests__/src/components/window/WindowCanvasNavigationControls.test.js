import React from 'react';
import { shallow } from 'enzyme';
import { WindowCanvasNavigationControls } from '../../../../src/components/window/WindowCanvasNavigationControls';
import ViewerInfo from '../../../../src/containers/window/ViewerInfo';
import ViewerNavigation from '../../../../src/containers/window/ViewerNavigation';
import ZoomControls from '../../../../src/containers/window/ZoomControls';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowCanvasNavigationControls
      canvases={[]}
      canvasLabel="label"
      window={{}}
      zoomToWorld={() => {}}
      {...props}
    />,
  );
}

describe('WindowCanvasNavigationControls', () => {
  let wrapper;
  const zoomToWorld = jest.fn();

  it('renders properly', () => {
    wrapper = createWrapper({ zoomToWorld });
    expect(wrapper.matchesElement(
      <div>
        <ZoomControls zoomToWorld={zoomToWorld} />
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

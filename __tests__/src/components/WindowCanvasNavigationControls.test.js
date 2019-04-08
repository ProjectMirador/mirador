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
      zoomIn={() => {}}
      zoomOut={() => {}}
      zoomToWorld={() => {}}
      {...props}
    />,
  );
}

describe('WindowCanvasNavigationControls', () => {
  let wrapper;
  const zoomIn = jest.fn();
  const zoomOut = jest.fn();
  const zoomToWorld = jest.fn();

  it('renders properly', () => {
    wrapper = createWrapper({ zoomIn, zoomOut, zoomToWorld });
    expect(wrapper.matchesElement(
      <div>
        <ZoomControls zoomToWorld={zoomToWorld} zoomIn={zoomIn} zoomOut={zoomOut} />
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

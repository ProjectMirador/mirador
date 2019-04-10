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

  it('updates the canvasNavWidth state when the visibility changes', () => {
    wrapper = createWrapper({ visible: false });
    wrapper.instance().canvasNav = { current: { offsetWidth: 300 } }; // fake the ref

    expect(wrapper.state('canvasNavWidth')).toEqual(null);

    wrapper.setProps({ visible: true });

    expect(wrapper.state('canvasNavWidth')).toEqual(300);
  });
});

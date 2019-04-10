import React from 'react';
import { shallow } from 'enzyme';
import Paper from '@material-ui/core/Paper';
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
      size={{ width: 300 }}
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
      <Paper square>
        <ZoomControls zoomToWorld={zoomToWorld} />
        <ViewerNavigation />
        <ViewerInfo />
      </Paper>,
    )).toBe(true);
  });

  it('renders nothing when visible=false', () => {
    wrapper = createWrapper({ visible: false });
    expect(wrapper.matchesElement(<></>)).toBe(true);
  });

  it('sets the proper class/ZoomControls prop dependent on the size/width prop', () => {
    wrapper = createWrapper();

    expect(wrapper.find('.mirador-canvas-nav-stacked').length).toEqual(0);
    expect(wrapper.find(ZoomControls).props().displayDivider).toBe(true);

    wrapper.setProps({ size: { width: 200 } });

    expect(wrapper.find('.mirador-canvas-nav-stacked').length).toEqual(1);
    expect(wrapper.find(ZoomControls).props().displayDivider).toBe(false);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { WindowViewer } from '../../../src/components/WindowViewer';
import OSDViewer from '../../../src/containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../../../src/containers/WindowCanvasNavigationControls';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowViewer
      windowId="xyz"
      {...props}
    />,
  );
}

describe('WindowViewer', () => {
  let wrapper;
  it('renders properly', () => {
    wrapper = createWrapper();
    expect(wrapper.matchesElement(
      <OSDViewer>
        <WindowCanvasNavigationControls />
      </OSDViewer>,
    )).toBe(true);
  });
});

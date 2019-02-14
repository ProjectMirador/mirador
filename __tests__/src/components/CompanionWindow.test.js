import React from 'react';
import { shallow } from 'enzyme';
import CompanionWindow from '../../../src/components/CompanionWindow';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindow
      windowId="abc123"
      classes={{}}
      {...props}
    />,
  ).dive(); // unwrap HOC created by withStyles()
}

describe('CompanionWindow', () => {
  let companionWindow;

  describe('when the panelContent is set to "info"', () => {
    it('renders the WindowSideBarInfoPanel', () => {
      companionWindow = createWrapper({ panelContent: 'info' });
      expect(companionWindow.find(WindowSideBarInfoPanel).length).toBe(1);
    });
  });

  describe('when the sideBarPanel is set to any unknown value/undefined', () => {
    it('does not render any panel component', () => {
      companionWindow = createWrapper();
      expect(companionWindow.find(WindowSideBarInfoPanel).length).toBe(0);
    });
  });
});

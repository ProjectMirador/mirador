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
      position="right"
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

  describe('when the close companion window button is clicked', () => {
    it('triggers the closeCompanionWindow prop with the appropriate args', () => {
      const closeCompanionWindowEvent = jest.fn();
      companionWindow = createWrapper({
        closeCompanionWindow: closeCompanionWindowEvent,
      });

      const closeButton = companionWindow.find('WithStyles(IconButton)[aria-label="closeCompanionWindow"]');
      closeButton.simulate('click');
      expect(closeCompanionWindowEvent).toHaveBeenCalledTimes(1);
      expect(closeCompanionWindowEvent).toHaveBeenCalledWith('abc123', null, 'right');
    });
  });
});

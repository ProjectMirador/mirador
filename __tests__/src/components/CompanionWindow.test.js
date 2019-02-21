import React from 'react';
import { shallow } from 'enzyme';
import CompanionWindow from '../../../src/components/CompanionWindow';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindow
      id="abc123"
      windowId="x"
      classes={{}}
      companionWindow={{}}
      position="right"
      {...props}
    />,
  ).dive(); // unwrap HOC created by withStyles()
}

describe('CompanionWindow', () => {
  let companionWindow;

  describe('when the panelContent is set to "info"', () => {
    it('renders the WindowSideBarInfoPanel', () => {
      companionWindow = createWrapper({ content: 'info' });
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
    it('triggers the onCloseClick prop with the appropriate args', () => {
      const removeCompanionWindowEvent = jest.fn();
      companionWindow = createWrapper({
        onCloseClick: removeCompanionWindowEvent,
      });

      const closeButton = companionWindow.find('WithStyles(IconButton)[aria-label="closeCompanionWindow"]');
      closeButton.simulate('click');
      expect(removeCompanionWindowEvent).toHaveBeenCalledTimes(1);
      expect(removeCompanionWindowEvent).toHaveBeenCalledWith('x', 'abc123');
    });
  });
});

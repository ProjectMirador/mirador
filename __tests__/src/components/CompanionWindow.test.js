import React from 'react';
import { shallow } from 'enzyme';
import { CompanionWindow } from '../../../src/components/CompanionWindow';

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
  );
}

describe('CompanionWindow', () => {
  let companionWindow;

  describe('when the openInCompanionWindow button is clicked', () => {
    it('triggers the updateCompanionWindow prop with the appropriate args', () => {
      const updateCompanionWindow = jest.fn();
      companionWindow = createWrapper({
        updateCompanionWindow,
        position: 'left',
      });

      const closeButton = companionWindow.find('WithStyles(IconButton)[aria-label="openInCompanionWindow"]');

      closeButton.simulate('click');
      expect(updateCompanionWindow).toHaveBeenCalledTimes(1);
      expect(updateCompanionWindow).toHaveBeenCalledWith('x', 'abc123', { position: 'right' });
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

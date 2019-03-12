import React from 'react';
import { shallow } from 'enzyme';
import { CompanionWindow } from '../../../src/components/CompanionWindow';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindow
      id="abc123"
      windowId="x"
      classes={{ horizontal: 'horizontal', vertical: 'vertical' }}
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

      const button = companionWindow.find('WithStyles(IconButton)[aria-label="openInCompanionWindow"]');

      button.simulate('click');
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
    });
  });

  describe('when the companion window is on the right', () => {
    const updateCompanionWindow = jest.fn();
    companionWindow = createWrapper({ updateCompanionWindow, position: 'right' });

    expect(companionWindow.find('WithStyles(Paper).vertical').length).toBe(1);

    const button = companionWindow.find('WithStyles(IconButton)[aria-label="openInCompanionWindow"]');
    button.simulate('click');
    expect(updateCompanionWindow).toHaveBeenCalledTimes(1);
    expect(updateCompanionWindow).toHaveBeenCalledWith('x', 'abc123', { position: 'bottom' });
  });

  describe('when the companion window is on the bottom', () => {
    const updateCompanionWindow = jest.fn();
    companionWindow = createWrapper({ updateCompanionWindow, position: 'bottom' });

    expect(companionWindow.find('WithStyles(Paper).horizontal').length).toBe(1);

    const button = companionWindow.find('WithStyles(IconButton)[aria-label="openInCompanionWindow"]');
    button.simulate('click');
    expect(updateCompanionWindow).toHaveBeenCalledTimes(1);
    expect(updateCompanionWindow).toHaveBeenCalledWith('x', 'abc123', { position: 'right' });
  });

  it('renders title controls', () => {
    companionWindow = createWrapper({ position: 'bottom', titleControls: <div className="xyz" /> });
    expect(companionWindow.find('div.xyz').length).toBe(1);
  });
});

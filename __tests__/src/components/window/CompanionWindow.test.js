import React from 'react';
import { shallow } from 'enzyme';
import MiradorMenuButton from '../../../../src/containers/MiradorMenuButton';
import { CompanionWindow } from '../../../../src/components/window/CompanionWindow';

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
    it('passes the the updateCompanionWindow prop to MiradorMenuButton with the appropriate args', () => {
      const updateCompanionWindow = jest.fn();
      companionWindow = createWrapper({
        position: 'left',
        updateCompanionWindow,
      });

      const button = companionWindow.find(MiradorMenuButton);
      button.props().onClick(); // Trigger the onClick prop
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

      const button = companionWindow.find(MiradorMenuButton);
      button.props().onClick(); // Trigger the onClick prop
      expect(removeCompanionWindowEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the companion window is on the right', () => {
    const updateCompanionWindow = jest.fn();
    companionWindow = createWrapper({
      position: 'right',
      updateCompanionWindow,
    });

    expect(companionWindow.find('WithStyles(Paper).vertical').length).toBe(1);

    const button = companionWindow.find(MiradorMenuButton).first();
    button.props().onClick(); // Trigger the onClick prop
    expect(updateCompanionWindow).toHaveBeenCalledTimes(1);
    expect(updateCompanionWindow).toHaveBeenCalledWith('x', 'abc123', { position: 'bottom' });
  });

  describe('when the companion window is on the bottom', () => {
    const updateCompanionWindow = jest.fn();
    companionWindow = createWrapper({
      position: 'bottom',
      updateCompanionWindow,
    });

    expect(companionWindow.find('WithStyles(Paper).horizontal').length).toBe(1);

    const button = companionWindow.find(MiradorMenuButton).first();
    button.props().onClick(); // Trigger the onClick prop
    expect(updateCompanionWindow).toHaveBeenCalledTimes(1);
    expect(updateCompanionWindow).toHaveBeenCalledWith('x', 'abc123', { position: 'right' });
  });

  it('renders title controls when available', () => {
    companionWindow = createWrapper({ position: 'bottom', titleControls: <div className="xyz" /> });
    expect(companionWindow.find('.mirador-companion-window-title-controls div.xyz').length).toBe(1);

    companionWindow = createWrapper({ position: 'bottom' });
    expect(companionWindow.find('.mirador-companion-window-title-controls').length).toBe(0);
  });
});

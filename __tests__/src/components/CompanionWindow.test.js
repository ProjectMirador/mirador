import React from 'react';
import { shallow } from 'enzyme';
import { Rnd } from 'react-rnd';
import MiradorMenuButton from '../../../src/containers/MiradorMenuButton';
import { CompanionWindow } from '../../../src/components/CompanionWindow';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindow
      id="abc123"
      windowId="x"
      classes={{ horizontal: 'horizontal', small: 'small', vertical: 'vertical' }}
      companionWindow={{}}
      position="right"
      {...props}
    />,
  );
}

describe('CompanionWindow', () => {
  let companionWindow;
  describe('aria-label', () => {
    it('has an aria-label for the landmark derived from the title', () => {
      companionWindow = createWrapper({ title: 'some title' });
      expect(companionWindow.prop('aria-label')).toEqual('some title');
    });
    it('can be overridden with an explicit ariaLabel prop', () => {
      companionWindow = createWrapper({ ariaLabel: 'some label', title: 'some title' });
      expect(companionWindow.prop('aria-label')).toEqual('some label');
    });
  });

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

    expect(companionWindow.find('.vertical').length).toBe(1);

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

    expect(companionWindow.find('.horizontal').length).toBe(1);

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

  it('adds a small class when the component width is small', () => {
    companionWindow = createWrapper({ size: { width: 369 } });
    expect(companionWindow.find('.small').length).toBe(1);
  });
  it('has a resize handler ', () => {
    companionWindow = createWrapper();
    expect(companionWindow.find(Rnd).length).toBe(1);
    expect(companionWindow.find(Rnd).prop('enableResizing').left).toBe(true);
    expect(companionWindow.find(Rnd).prop('default')).toEqual({ height: '100%', width: 235 });

    companionWindow = createWrapper({ position: 'bottom' });
    expect(companionWindow.find(Rnd).length).toBe(1);
    expect(companionWindow.find(Rnd).prop('enableResizing').top).toBe(true);
    expect(companionWindow.find(Rnd).prop('default')).toEqual({ height: 201, width: 'auto' });
  });
});

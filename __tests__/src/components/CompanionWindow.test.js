import React from 'react';
import { shallow } from 'enzyme';
import { CompanionWindow } from '../../../src/components/CompanionWindow';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../../../src/containers/WindowSideBarCanvasPanel';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindow
      classes={{}}
      content="info"
      id="abc123"
      windowId="x"
      position="right"
      onCloseClick={() => {}}
      toggleAreaOfCompanionWindow={() => {}}
      {...props}
    />,
  );
}

describe('CompanionWindow', () => {
  let wrapper;

  it('renders outer element correctly', () => {
    wrapper = createWrapper({ position: 'right' });
    expect(wrapper.find('.mirador-companion-window-right').length).toBe(1);
    wrapper = createWrapper({ position: 'bottom' });
    expect(wrapper.find('.mirador-companion-window-bottom').length).toBe(1);
  });

  describe('when the panel content is set to "info"', () => {
    it('renders the WindowSideBarInfoPanel', () => {
      wrapper = createWrapper({ content: 'info' });
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(1);
    });
  });

  describe('when the panel content is set to "canvas_navigation"', () => {
    it('renders the WindowSideBarInfoPanel', () => {
      wrapper = createWrapper({ content: 'canvas_navigation' });
      expect(wrapper.find(WindowSideBarCanvasPanel).length).toBe(1);
    });
  });

  describe('when the panel content is set to any unknown value/undefined', () => {
    it('does not render any panel component', () => {
      wrapper = createWrapper({ content: 'unknown' });
      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(0);
      expect(wrapper.find(WindowSideBarCanvasPanel).length).toBe(0);
    });
  });

  it('should pass close action to close button', () => {
    const closeAction = jest.fn();
    wrapper = createWrapper({ onCloseClick: closeAction });
    const closeButton = wrapper
      .findWhere(node => node.props()['aria-label'] === 'closeCompanionWindow');
    expect(closeButton.props().onClick).toBe(closeAction);
  });

  it('should pass toggle action to toggle button', () => {
    const toggleAction = jest.fn();
    wrapper = createWrapper({ toggleAreaOfCompanionWindow: toggleAction });
    const toggleButton = wrapper
      .findWhere(node => node.props()['aria-label'] === 'toggleAreaOfCompanionWindow');
    expect(toggleButton.props().onClick).toBe(toggleAction);
  });
});

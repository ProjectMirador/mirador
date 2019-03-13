import React from 'react';
import { shallow } from 'enzyme';
import { CompanionWindowFactory } from '../../../src/components/CompanionWindowFactory';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <CompanionWindowFactory
      windowId="x"
      id="123"
      content="closed"
      {...props}
    />,
  );
}

describe('CompanionWindowFactory', () => {
  let wrapper;

  describe('for an info window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'info',
      });

      expect(wrapper.find('WithStyles(Connect(WindowSideBarInfoPanel))').length).toBe(1);
    });
  });

  describe('for a canvas_navigation window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'canvas_navigation',
      });

      expect(wrapper.find('WithStyles(Connect(WindowSideBarCanvasPanel))').length).toBe(1);
    });
  });

  describe('for an annotation window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'annotations',
      });

      expect(wrapper.find('Connect(WindowSideBarAnnotationsPanel)').length).toBe(1);
    });
  });
});

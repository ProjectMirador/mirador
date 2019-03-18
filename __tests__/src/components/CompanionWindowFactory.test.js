import React from 'react';
import { shallow } from 'enzyme';
import WindowSideBarInfoPanel from '../../../src/containers/WindowSideBarInfoPanel';
import WindowSideBarCanvasPanel from '../../../src/containers/WindowSideBarCanvasPanel';
import WindowSideBarAnnotationsPanel from '../../../src/containers/WindowSideBarAnnotationsPanel';
import ThumbnailNavigation from '../../../src/containers/ThumbnailNavigation';
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

      expect(wrapper.find(WindowSideBarInfoPanel).length).toBe(1);
    });
  });

  describe('for a canvas_navigation window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'canvas_navigation',
      });

      expect(wrapper.find(WindowSideBarCanvasPanel).length).toBe(1);
    });
  });

  describe('for an annotation window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'annotations',
      });

      expect(wrapper.find(WindowSideBarAnnotationsPanel).length).toBe(1);
    });
  });

  describe('for the thumbnail nav window', () => {
    it('renders the appropriate arg component', () => {
      wrapper = createWrapper({
        content: 'thumbnail_navigation',
      });

      expect(wrapper.find(ThumbnailNavigation).length).toBe(1);
    });
  });
});

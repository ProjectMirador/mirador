import { render, screen } from 'test-utils';

import { CompanionWindowFactory } from '../../../src/components/CompanionWindowFactory';

/** create wrapper */
function createWrapper({ content = 'closed', ...props }) {
  return render(
    <CompanionWindowFactory
      id="123"
      content={content}
      {...props}
    />,
    { preloadedState: { companionWindows: { 123: { content }, thumb: {} }, windows: { x: { thumbnailNavigationId: 'thumb' } } }, windowId: 'x' },
  );
}

describe('CompanionWindowFactory', () => {
  describe('for an info window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'info',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('aboutThisItem');
    });
  });

  describe('for a canvas navigation window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'canvas',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('canvasIndex');
    });
  });

  describe('for an annotation window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'annotations',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('annotations');
    });
  });

  describe('for an attribution window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'attribution',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('attributionTitle');
    });
  });

  describe('for the thumbnail nav window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'thumbnailNavigation',
      });

      expect(screen.getByRole('grid')).toHaveAccessibleName('thumbnailNavigation');
    });
  });

  describe('for the search window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'search',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('searchTitle');
    });
  });

  describe('for the layers window', () => {
    it('renders the appropriate arg component', () => {
      createWrapper({
        content: 'layers',
      });

      expect(screen.getByRole('heading', { level: 3 })).toHaveAccessibleName('layers');
    });
  });
});

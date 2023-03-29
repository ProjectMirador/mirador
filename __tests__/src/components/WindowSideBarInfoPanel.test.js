import { render, screen } from 'test-utils';

import { WindowSideBarInfoPanel } from '../../../src/components/WindowSideBarInfoPanel';

/** create wrapper */
function createWrapper(props) {
  return render(
    <WindowSideBarInfoPanel
      id="asdf"
      windowId="zxcv"
      t={str => str}
      {...props}
    />,
    { preloadedState: { companionWindows: { asdf: { content: 'info' } } } },
  );
}
describe('WindowSideBarInfoPanel', () => {
  describe('when metadata is present', () => {
    it('renders headers', () => {
      createWrapper();
      expect(screen.getByRole('heading', { name: 'aboutThisItem' })).toBeInTheDocument();
    });

    it('renders the manifest elements', () => {
      createWrapper();

      expect(screen.getByRole('heading', { name: 'resource' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'related' })).toBeInTheDocument();
    });

    it('renders the canvas elements', () => {
      createWrapper({ canvasIds: ['1', '2'] });

      expect(screen.getAllByRole('heading', { name: 'currentItem' }).length).toEqual(2);
    });
  });
});

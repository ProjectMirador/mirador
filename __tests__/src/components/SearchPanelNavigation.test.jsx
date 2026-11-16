import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildMiradorState } from '@tests/utils/build-state';
import SearchPanelNavigation from '@src/containers/SearchPanelNavigation';

const defaultResources = [
  { '@id': '1', on: 'canvas-1' },
  { '@id': '2', on: 'canvas-1' },
  { '@id': '3', on: 'canvas-1' },
];

const searchUrl = 'http://example.com/search?q=foo';

describe.each([
  ['Presentation 2', buildManifestV2()],
  ['Presentation 3', buildManifestV3()],
])('SearchPanelNavigation (%s)', (_label, manifest) => {
  const renderNavigation = ({ hits = [], resources = defaultResources, selectedContentSearchAnnotationIds = [] } = {}) => {
    const preloadedState = buildMiradorState({
      windows: [{ companionWindows: [{ content: 'search' }], manifest }],
    });

    const [windowId] = preloadedState.workspace.windowIds;
    const [companionWindowId] = preloadedState.windows[windowId].companionWindowIds;

    preloadedState.searches = {
      [windowId]: {
        [companionWindowId]: {
          data: { [searchUrl]: { json: { hits, resources } } },
          selectedContentSearchAnnotationIds,
        },
      },
    };

    return {
      ...render(<SearchPanelNavigation companionWindowId={companionWindowId} windowId={windowId} />, {
        preloadedState,
      }),
      windowId,
    };
  };

  describe('when searchHits are available', () => {
    it('renders text with buttons', async () => {
      const user = userEvent.setup();
      const { store, windowId } = renderNavigation({
        hits: [{ annotations: ['1'] }, { annotations: ['2'] }, { annotations: ['3'] }],
        selectedContentSearchAnnotationIds: ['2'],
      });

      expect(screen.getByText('2 of 3')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toEqual(2);

      await user.click(screen.getByRole('button', { name: 'Previous result' }));
      expect(store.getState().windows[windowId].selectedAnnotationId).toEqual('1');

      await user.click(screen.getByRole('button', { name: 'Next result' }));
      await user.click(screen.getByRole('button', { name: 'Next result' }));
      expect(store.getState().windows[windowId].selectedAnnotationId).toEqual('3');
    });

    it('buttons disabled when no next/prev', () => {
      renderNavigation({
        hits: [{ annotations: ['1'] }, { annotations: ['2'] }],
        selectedContentSearchAnnotationIds: ['1'],
      });

      expect(screen.getByRole('button', { name: 'Previous result' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next result' })).toBeEnabled();
    });

    it('disables next button on last result', () => {
      renderNavigation({
        hits: [{ annotations: ['1'] }, { annotations: ['2'] }],
        selectedContentSearchAnnotationIds: ['2'],
      });

      expect(screen.getByRole('button', { name: 'Previous result' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Next result' })).toBeDisabled();
    });
  });
});

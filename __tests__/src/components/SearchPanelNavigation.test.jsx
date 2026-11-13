import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchPanelNavigation } from '@src/components/SearchPanelNavigation';

/** */
function buildPreloadedState({
  hits = [{ annotations: ['1'] }, { annotations: ['2'] }, { annotations: ['3'] }],
  selectedContentSearchAnnotationIds = ['2'],
} = {}) {
  return {
    manifests: {
      manifest1: {
        id: 'manifest1',
        json: {
          '@context': 'http://iiif.io/api/presentation/2/context.json',
          '@id': 'manifest1',
          '@type': 'sc:Manifest',
          sequences: [
            {
              canvases: [{ '@id': 'canvas-1' }],
            },
          ],
        },
      },
    },
    searches: {
      window: {
        cw: {
          data: {
            'search?q=test': {
              json: {
                hits,
                resources: [
                  { '@id': '1', on: 'canvas-1' },
                  { '@id': '2', on: 'canvas-1' },
                  { '@id': '3', on: 'canvas-1' },
                ],
                within: { total: hits.length },
              },
            },
          },
          query: 'test',
          selectedContentSearchAnnotationIds,
        },
      },
    },
    windows: {
      window: {
        id: 'window',
        manifestId: 'manifest1',
      },
    },
  };
}

/** */
function createWrapper(stateOptions = {}) {
  return render(<SearchPanelNavigation companionWindowId="cw" windowId="window" />, {
    preloadedState: buildPreloadedState(stateOptions),
  });
}

describe('SearchPanelNavigation', () => {
  describe('when searchHits are available', () => {
    it('renders text with buttons', async () => {
      const user = userEvent.setup();
      const { store } = createWrapper({
        hits: [{ annotations: ['1'] }, { annotations: ['2'] }, { annotations: ['3'] }],
        selectedContentSearchAnnotationIds: ['2'],
      });

      expect(screen.getByText('2 of 3')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toEqual(2);

      await user.click(screen.getByRole('button', { name: 'Previous result' }));
      expect(store.getState().windows.window.selectedAnnotationId).toEqual('1');
      expect(screen.getByText('1 of 3')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Next result' }));
      expect(store.getState().windows.window.selectedAnnotationId).toEqual('2');
      expect(screen.getByText('2 of 3')).toBeInTheDocument();
    });

    it('buttons disabled when no next/prev', () => {
      createWrapper({
        hits: [{ annotations: ['1'] }],
        selectedContentSearchAnnotationIds: ['1'],
      });

      expect(screen.getByRole('button', { name: 'Previous result' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next result' })).toBeDisabled();
    });
  });
});

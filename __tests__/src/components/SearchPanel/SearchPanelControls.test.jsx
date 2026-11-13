import { act, render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import * as actions from '@src/state/actions';
import manifestFixtureFg165hz3589 from '@tests/fixtures/version-2/fg165hz3589.json';
import { autocompleteMock } from '@tests/mocks/autocompleteMock';
import { server } from '@tests/mocks/server';
import { SearchPanelControls } from '@src/components/SearchPanel/SearchPanelControls';

const searchEndpoint = 'https://contentsearch.stanford.edu/fg165hz3589/search';
const autocompleteEndpoint = 'https://contentsearch.stanford.edu/fg165hz3589/autocomplete';

/** */
function buildPreloadedState({ isFetching = false, query = '' } = {}) {
  return {
    manifests: {
      manifest1: {
        id: 'manifest1',
        json: manifestFixtureFg165hz3589,
      },
    },
    searches: {
      window: {
        cw: {
          data: isFetching ? { 'search?page=1': { isFetching: true } } : {},
          query,
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
  return render(<SearchPanelControls companionWindowId="cw" windowId="window" />, {
    preloadedState: buildPreloadedState(stateOptions),
  });
}

describe('SearchPanelControls', () => {
  beforeEach(() => {
    server.use(
      http.get(autocompleteEndpoint, () =>
        HttpResponse.json(autocompleteMock, {
          headers: { 'Access-Control-Allow-Origin': '*' },
        }),
      ),
      http.get(searchEndpoint, ({ request }) => {
        const query = new URL(request.url).searchParams.get('q') || '';
        return HttpResponse.json({
          '@context': ['http://iiif.io', 'http://iiif.io'],
          '@id': `${searchEndpoint}?q=${query}`,
          '@type': 'sc:AnnotationList',
          hits: [],
          resources: [],
          within: {
            '@type': 'sc:Layer',
            first: `${searchEndpoint}?start=0`,
            ignored: [],
            last: `${searchEndpoint}?start=0`,
          },
        });
      }),
    );
  });

  it('renders a form', () => {
    createWrapper();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('displays proposed autocomplete options when typing and submits search', async () => {
    const user = userEvent.setup();
    const { store } = createWrapper();

    const input = screen.getByRole('combobox');
    await user.type(input, 'wund');

    expect(await screen.findByRole('option', { name: 'wunder' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'wunderbar' })).toBeInTheDocument();

    const wunderOption = await screen.findByRole('option', { name: 'wunder' });
    await user.click(wunderOption);

    expect(store.getState().searches.window.cw.query).toEqual('wunder');
  });

  it('renders a text input through the renderInput prop', () => {
    createWrapper();

    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'search-cw');
  });

  it('endAdornment is a SearchIcon (with no CircularProgress indicator)', () => {
    createWrapper();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('endAdornment has a CircularProgress indicator when the current search is fetching', () => {
    createWrapper({ isFetching: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('form change and submission triggers a search action', async () => {
    const user = userEvent.setup();
    const { store } = createWrapper({ query: 'asdf' });

    await user.clear(screen.getByRole('combobox'));
    await user.keyboard('yolo');
    await user.click(screen.getByRole('button'));

    expect(store.getState().searches.window.cw.query).toEqual('yolo');
  });

  it('does not submit an empty search', async () => {
    const user = userEvent.setup();
    const { store } = createWrapper({ query: '' });

    await user.clear(screen.getByRole('combobox'));
    await user.click(screen.getByRole('button', { name: 'Search in the document' }));

    expect(store.getState().searches.window.cw.query).toEqual('');
  });

  describe('input', () => {
    it('has the query state as the input value on initial render', () => {
      createWrapper({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');
    });

    it('clears the local search state/input when the Redux query has been cleared', () => {
      const { store } = createWrapper({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');

      act(() => {
        store.dispatch(actions.removeSearch('window', 'cw'));
      });

      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });
});

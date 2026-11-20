import { act, render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { autocompleteMock } from '@tests/mocks/autocompleteMock';
import { server } from '@tests/mocks/server';
import { removeSearch } from '@src/state/actions';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildMiradorState } from '@tests/utils/build-state';
import SearchPanelControls from '@src/containers/SearchPanelControls';

const presentationContext = 'http://iiif.io/api/presentation/2/context.json';
const searchContext = 'http://iiif.io/api/search/1/context.json';
const searchProfile = 'http://iiif.io/api/search/1/search';
const autocompleteProfile = 'http://iiif.io/api/search/1/autocomplete';
const defaultSearchId = 'http://example.com/search';
const stanfordBase = 'https://contentsearch.stanford.edu/fg165hz3589';
const wwwSearchId = 'http://www.example.com/search';

const emptySearchResponse = (id) => ({
  '@context': [presentationContext, searchContext],
  '@id': id,
  '@type': 'sc:AnnotationList',
  hits: [],
  resources: [],
  within: {
    '@type': 'sc:Layer',
    first: `${id.split('?')[0]}?start=0`,
    ignored: [],
    last: `${id.split('?')[0]}?start=0`,
  },
});

describe.each([
  [
    'Presentation 2',
    (searchId) =>
      buildManifestV2({
        service: [
          {
            '@context': searchContext,
            '@id': searchId,
            profile: searchProfile,
            service: { '@id': `${stanfordBase}/autocomplete`, profile: autocompleteProfile },
          },
        ],
      }),
  ],
  [
    'Presentation 3',
    (searchId) =>
      buildManifestV3({
        service: [
          {
            id: searchId,
            profile: searchProfile,
            type: 'SearchService1',
            service: [{ id: `${stanfordBase}/autocomplete`, profile: autocompleteProfile, type: 'AutoCompleteService1' }],
          },
        ],
      }),
  ],
])('SearchPanelControls (%s)', (_label, createManifest) => {
  const renderControls = ({ data = {}, query, searchId = defaultSearchId } = {}) => {
    const preloadedState = buildMiradorState({
      windows: [
        {
          companionWindows: [
            {
              content: 'search',
              data: { data, query },
            },
          ],
          manifest: createManifest(searchId),
        },
      ],
    });

    const [windowId] = preloadedState.workspace.windowIds;
    const [companionWindowId] = preloadedState.windows[windowId].companionWindowIds;

    return {
      ...render(<SearchPanelControls companionWindowId={companionWindowId} windowId={windowId} />, {
        preloadedState,
      }),
      companionWindowId,
      windowId,
    };
  };

  beforeEach(() => {
    server.use(
      http.get(defaultSearchId, ({ request }) => {
        const q = new URL(request.url).searchParams.get('q') || '';
        return HttpResponse.json(emptySearchResponse(`${defaultSearchId}?q=${q}`));
      }),
    );
  });

  it('renders a form', () => {
    renderControls();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('displays proposed autocomplete options when typing and submits search', async () => {
    const user = userEvent.setup();
    let requestedSearchUrl;

    server.use(
      http.get(`${stanfordBase}/autocomplete`, () => HttpResponse.json(autocompleteMock)),
      http.get(`${stanfordBase}/search`, ({ request }) => {
        requestedSearchUrl = request.url;
        return HttpResponse.json(emptySearchResponse(request.url));
      }),
    );

    renderControls({ searchId: `${stanfordBase}/search` });

    const input = screen.getByRole('combobox');
    await user.type(input, 'wund');

    expect(await screen.findByRole('option', { name: 'wunder' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'wunderbar' })).toBeInTheDocument();

    const wunderOption = await screen.findByRole('option', { name: 'wunder' });
    await user.click(wunderOption);

    expect(requestedSearchUrl).toBe(`${stanfordBase}/search?q=wunder`);
    expect(input).toHaveValue('wunder');
  });

  it('renders a text input through the renderInput prop', () => {
    const { companionWindowId } = renderControls();

    expect(screen.getByRole('combobox')).toHaveAttribute('id', `search-${companionWindowId}`);
  });

  it('endAdornment is a SearchIcon (with no CircularProgress indicator)', () => {
    renderControls();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('endAdornment has a CircularProgress indicator when the current search is fetching', () => {
    renderControls({
      data: { [`${defaultSearchId}?q=foo`]: { isFetching: true } },
      query: 'foo',
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('form change and submission triggers a search action', async () => {
    const user = userEvent.setup();
    let requestedSearchUrl;

    server.use(
      http.get(wwwSearchId, ({ request }) => {
        requestedSearchUrl = request.url;
        return HttpResponse.json(emptySearchResponse(request.url));
      }),
    );

    renderControls({
      query: 'asdf',
      searchId: wwwSearchId,
    });

    const input = screen.getByRole('combobox');
    await user.clear(input);
    await user.keyboard('yolo');
    await user.click(screen.getByRole('button'));

    expect(requestedSearchUrl).toBe(`${wwwSearchId}?q=yolo`);
    expect(input).toHaveValue('yolo');
  });

  it('does not submit an empty search', async () => {
    const user = userEvent.setup();
    let searchCalled = false;

    server.use(
      http.get(wwwSearchId, () => {
        searchCalled = true;
        return HttpResponse.json({});
      }),
    );

    renderControls({
      query: '',
      searchId: wwwSearchId,
    });

    await user.clear(screen.getByRole('combobox'));
    await user.click(screen.getByRole('button', { name: 'Search in the document' }));
    expect(searchCalled).toBe(false);
  });

  describe('input', () => {
    it('has the query prop as the input value on initial render', () => {
      renderControls({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');
    });

    it('clears the local search state/input when the incoming query prop has been cleared', () => {
      const { companionWindowId, store, windowId } = renderControls({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');

      act(() => {
        store.dispatch(removeSearch(windowId, companionWindowId));
      });

      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });
});

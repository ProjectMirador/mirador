import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { server } from '@tests/mocks/server';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildMiradorState } from '@tests/utils/build-state';
import SearchPanel from '@src/containers/SearchPanel';

const presentation2Context = 'http://iiif.io/api/presentation/2/context.json';
const search1Context = 'http://iiif.io/api/search/1/context.json';
const search1Profile = 'http://iiif.io/api/search/1/search';
const searchUrl = 'http://example.com/search';

const v2Manifest = buildManifestV2({
  service: [{ '@context': search1Context, '@id': searchUrl, profile: search1Profile }],
});

const v3Manifest = buildManifestV3({
  service: [{ id: searchUrl, profile: search1Profile, type: 'SearchService1' }],
});

const searchResponse = {
  '@context': [presentation2Context, search1Context],
  '@id': `${searchUrl}?q=Dry+Cleaning+%26+Laundry`,
  '@type': 'sc:AnnotationList',
  hits: [
    {
      after: ' - (Located at side of Medical Building)',
      annotations: ['anno-1'],
      before: '',
      match: 'Dry Cleaning & Laundry',
    },
  ],
  resources: [
    {
      '@id': 'anno-1',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      on: 'canvas-1',
    },
  ],
};

describe.each([
  ['Presentation 2', v2Manifest],
  ['Presentation 3', v3Manifest],
])('SearchPanel (%s)', (_label, manifest) => {
  const renderPanel = (props = {}, { search, window } = {}) => {
    const preloadedState = buildMiradorState({
      windows: [{ companionWindows: [{ content: 'search' }], manifest, ...window }],
    });

    const [windowId] = preloadedState.workspace.windowIds;
    const [companionWindowId] = preloadedState.windows[windowId].companionWindowIds;

    if (search) {
      preloadedState.searches = {
        [windowId]: {
          [companionWindowId]: { data: {}, ...search },
        },
      };
    }

    return render(<SearchPanel id={companionWindowId} windowId={windowId} {...props} />, { preloadedState });
  };

  beforeEach(() => {
    server.use(http.get(searchUrl, () => HttpResponse.json(searchResponse)));
  });

  it('renders a CompanionWindow', () => {
    renderPanel();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  });

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    renderPanel(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=Wolpertinger`]: { isFetching: false, json: searchResponse } },
          query: 'Wolpertinger',
        },
      },
    );

    expect(screen.getByRole('heading', { name: /Search/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset search' })).toBeInTheDocument();
  });

  it('clears the search when the Clear chip is clicked', async () => {
    const user = userEvent.setup();

    renderPanel(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=Wolpertinger`]: { isFetching: false, json: searchResponse } },
          query: 'Wolpertinger',
        },
      },
    );

    await user.click(screen.getByRole('button', { name: 'Reset search' }));

    expect(screen.queryByRole('button', { name: 'Reset search' })).not.toBeInTheDocument();
  });

  it('does not render a Clear chip if there is no search query to be cleared', () => {
    renderPanel();

    expect(screen.queryByRole('button', { name: 'Reset search' })).not.toBeInTheDocument();
  });

  it('has the SearchPanelControls component', () => {
    renderPanel();

    expect(screen.getByRole('combobox', { name: 'search terms' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search in the document' })).toBeInTheDocument();
  });

  it('has the SearchResults list', () => {
    renderPanel();

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('suggests searches, encodes special characters in the request URL, and renders results', async () => {
    const user = userEvent.setup();
    let requestedUrl;

    server.use(
      http.get(searchUrl, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json(searchResponse);
      }),
    );

    renderPanel({}, { window: { suggestedSearches: ['Dry Cleaning & Laundry'] } });

    const suggestionBtn = screen.getByRole('button', {
      name: 'Search this document for "Dry Cleaning & Laundry"',
    });
    expect(suggestionBtn).toBeInTheDocument();

    await user.click(suggestionBtn);

    const hits = await screen.findAllByRole('listitem');
    expect(hits).toHaveLength(1);
    expect(hits[0]).toHaveTextContent('1');
    expect(hits[0]).toHaveTextContent('Dry Cleaning & Laundry');
    expect(hits[0]).toHaveTextContent(/ - \(Located at side of Medical Building\)/);

    expect(requestedUrl).toBe(`${searchUrl}?q=Dry+Cleaning+%26+Laundry`);
  });

  it('does not suggest searches if the user has made a query', () => {
    renderPanel(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=blah`]: { isFetching: false, json: searchResponse } },
          query: 'blah',
        },
        window: { suggestedSearches: ['NSF'] },
      },
    );

    expect(screen.queryByRole('button', { name: 'Search this document for "NSF"' })).not.toBeInTheDocument();
  });
});

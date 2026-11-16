import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/mocks/server';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildMiradorState } from '@tests/utils/build-state';
import SearchResults from '@src/containers/SearchResults';

const presentationContext = 'http://iiif.io/api/presentation/2/context.json';
const searchContext = 'http://iiif.io/api/search/1/context.json';
const defaultSearchUrl = 'http://example.com/contentsearch';
const nextSearchUrl = `${defaultSearchUrl}?page=2`;

const defaultHit = {
  after: ', and start the chainsaw',
  annotations: ['foo'],
  before: 'Light up the',
  match: 'moose',
};

const defaultResource = {
  '@id': 'foo',
  '@type': 'oa:Annotation',
  motivation: 'sc:painting',
  on: 'canvas-1',
};

describe.each([
  ['Presentation 2', buildManifestV2()],
  ['Presentation 3', buildManifestV3()],
])('SearchResults (%s)', (_label, manifest) => {
  const renderResults = ({
    hits = [defaultHit],
    isFetching = false,
    next = undefined,
    query = 'query',
    resources = [defaultResource],
  } = {}) => {
    const preloadedState = buildMiradorState({
      windows: [{ companionWindows: [{ content: 'search' }], manifest }],
    });

    const [windowId] = preloadedState.workspace.windowIds;
    const [companionWindowId] = preloadedState.windows[windowId].companionWindowIds;

    preloadedState.searches = {
      [windowId]: {
        [companionWindowId]: {
          data: query
            ? {
                [defaultSearchUrl]: {
                  id: defaultSearchUrl,
                  isFetching,
                  json: {
                    hits,
                    resources,
                    ...(next && { next }),
                  },
                },
              }
            : {},
          query,
          selectedContentSearchAnnotationIds: [],
        },
      },
    };

    return {
      ...render(<SearchResults companionWindowId={companionWindowId} windowId={windowId} />, {
        preloadedState,
      }),
      companionWindowId,
      windowId,
    };
  };

  it('renders a SearchHit for each hit', () => {
    renderResults();
    expect(screen.getByRole('button', { name: /Light up the moose/ })).toBeInTheDocument();
  });

  it('can focus on a single item', async () => {
    const user = userEvent.setup();
    renderResults();

    await user.click(screen.getByRole('button', { name: 'more...' }));
    expect(screen.getByRole('listitem')).toHaveTextContent(/start the chainsaw/);

    expect(screen.queryByRole('button', { name: 'more...' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to results' }));
    expect(screen.getByRole('button', { name: 'more...' })).toBeInTheDocument();
  });

  describe('annotation-only search results', () => {
    it('renders a SearchHit for each annotation', () => {
      renderResults({
        hits: [],
        resources: [
          { '@id': 'x', '@type': 'oa:Annotation', label: 'The Anno Label', motivation: 'sc:painting' },
          { '@id': 'y', '@type': 'oa:Annotation', label: 'Annother Anno Label', motivation: 'sc:painting' },
        ],
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.getByRole('heading', { level: 4, name: 'The Anno Label' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: 'Annother Anno Label' })).toBeInTheDocument();
    });
  });

  describe('no search results', () => {
    it('shows no results', () => {
      renderResults({
        hits: [],
        isFetching: false,
        query: 'nope',
        resources: [],
      });

      expect(screen.getByText('No results found')).toHaveClass('MuiTypography-body1');
    });

    it('while fetching', () => {
      renderResults({
        hits: [],
        isFetching: true,
        query: 'nope',
        resources: [],
      });

      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    });

    it('without a query', () => {
      renderResults({
        isFetching: false,
        query: '',
      });

      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    });
  });

  describe('multi-page search results', () => {
    it('shows a button to request the next page', async () => {
      const user = userEvent.setup();
      let requestedUrl;

      server.use(
        http.get(defaultSearchUrl, ({ request }) => {
          requestedUrl = request.url;
          return HttpResponse.json({
            '@context': [presentationContext, searchContext],
            '@id': request.url,
            '@type': 'sc:AnnotationList',
            hits: [],
            resources: [],
          });
        }),
      );

      const { companionWindowId, store, windowId } = renderResults({ next: nextSearchUrl });

      await user.click(screen.getByRole('button', { name: /More results/ }));

      expect(requestedUrl).toBe(nextSearchUrl);
      expect(store.getState().searches[windowId][companionWindowId].data[nextSearchUrl]).toBeDefined();
    });
  });
});

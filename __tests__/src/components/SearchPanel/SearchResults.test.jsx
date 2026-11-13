import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '@tests/mocks/server';
import { SearchResults } from '@src/components/SearchPanel/SearchResults';

const defaultHits = [
  {
    after: ', and start the chainsaw',
    annotations: ['foo'],
    before: 'Light up the',
    match: 'moose',
  },
];

const defaultResources = [
  {
    '@id': 'foo',
    '@type': 'oa:Annotation',
    motivation: 'sc:painting',
    on: 'canvas-1',
  },
  {
    '@id': 'x',
    '@type': 'oa:Annotation',
    label: 'The Anno Label',
    on: 'canvas-1',
  },
  {
    '@id': 'y',
    '@type': 'oa:Annotation',
    label: 'Annother Anno Label',
    on: 'canvas-1',
  },
];

/** */
function createWrapper({
  hits = defaultHits,
  isFetching = false,
  next = undefined,
  query = 'query',
  resources = defaultResources,
  total = 1,
} = {}) {
  return render(<SearchResults companionWindowId="cwid" windowId="window" />, {
    preloadedState: {
      companionWindows: {
        cwid: {},
      },
      manifests: {
        manifest1: {
          id: 'manifest1',
          json: {
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id': 'manifest1',
            '@type': 'sc:Manifest',
            sequences: [
              {
                '@type': 'sc:Sequence',
                canvases: [{ '@id': 'canvas-1', '@type': 'sc:Canvas' }],
              },
            ],
          },
        },
      },
      searches: {
        window: {
          cwid: {
            data: {
              'http://example.com/contentsearch': {
                id: 'http://example.com/contentsearch',
                isFetching,
                json: {
                  hits,
                  next,
                  resources,
                  within: { total },
                },
              },
            },
            query,
            selectedContentSearchAnnotation: null,
            selectedContentSearchAnnotationIds: [],
          },
        },
      },
      windows: {
        window: {
          id: 'window',
          manifestId: 'manifest1',
        },
      },
    },
  });
}

describe('SearchResults', () => {
  it('renders a SearchHit for each hit', () => {
    createWrapper();

    expect(screen.getByRole('button', { name: /Light up the moose/ })).toBeInTheDocument();
  });

  it('can focus on a single item', async () => {
    const user = userEvent.setup();
    createWrapper();

    await user.click(screen.getByRole('button', { name: 'more...' }));
    expect(screen.getByRole('listitem')).toHaveTextContent(/start the chainsaw/);

    expect(screen.queryByRole('button', { name: 'more...' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to results' }));
    expect(screen.getByRole('button', { name: 'more...' })).toBeInTheDocument();
  });

  describe('annotation-only search results', () => {
    it('renders a SearchHit for each annotation', () => {
      createWrapper({
        hits: [],
        resources: [
          { '@id': 'x', '@type': 'oa:Annotation', label: 'The Anno Label', on: 'canvas-1' },
          { '@id': 'y', '@type': 'oa:Annotation', label: 'Annother Anno Label', on: 'canvas-1' },
        ],
      });

      expect(screen.getAllByRole('listitem')).toHaveLength(2);

      expect(screen.getByRole('heading', { level: 4, name: '1 The Anno Label' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: '1 Annother Anno Label' })).toBeInTheDocument();
    });
  });

  describe('no search results', () => {
    it('shows no results', () => {
      createWrapper({
        hits: [],
        isFetching: false,
        query: 'nope',
        resources: [],
      });

      expect(screen.getByText('No results found')).toHaveClass('MuiTypography-body1');
    });

    it('while fetching', () => {
      createWrapper({
        hits: [],
        isFetching: true,
        query: 'nope',
        resources: [],
      });

      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    });

    it('without a query', () => {
      createWrapper({
        hits: [],
        isFetching: false,
        query: '',
        resources: [],
      });
      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    });
  });

  describe('multi-page search results', () => {
    it('shows a button to request the next page', async () => {
      const user = userEvent.setup();
      let requestedPageUrl;

      server.use(
        http.get('http://example.com', ({ request }) => {
          requestedPageUrl = request.url;
          return HttpResponse.json({
            '@context': 'http://iiif.io/api/presentation/2/context.json',
            '@id': request.url,
            '@type': 'sc:AnnotationList',
            hits: [],
            resources: [],
          });
        }),
      );

      createWrapper({
        next: 'http://example.com?page=2',
        total: 5,
      });

      await user.click(screen.getByRole('button', { name: /More results/ }));
      expect(new URL(requestedPageUrl).searchParams.get('page')).toEqual('2');
    });
  });
});

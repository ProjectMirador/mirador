import { render, screen, within } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { contentSearchMock } from '../../mocks/contentSearchMock';
import manifestFixtureFg165hz3589 from '../../fixtures/version-2/fg165hz3589.json';
import SearchPanel from '../../../src/containers/SearchPanel';

/**
 * Helper function to wrap the Redux-connected SearchPanel
 */
function createWrapper(props = {}, { search, window } = {}) {
  return render(<SearchPanel id="xyz" windowId="window" {...props} />, {
    preloadedState: {
      companionWindows: { xyz: { content: 'search' } },
      manifests: {
        manifest: {
          id: 'manifest',
          json: manifestFixtureFg165hz3589,
        },
      },
      ...(search && {
        searches: {
          window: {
            xyz: {
              data: {},
              ...search,
            },
          },
        },
      }),
      windows: {
        window: {
          id: 'window',
          manifestId: 'manifest',
          ...window,
        },
      },
    },
  });
}

describe('SearchPanel', () => {
  const searchUrl = manifestFixtureFg165hz3589.service.at(0)['@id'];
  beforeEach(() => {
    server.use(
      http.get(searchUrl, ({ request }) => {
        const query = new URL(request.url).searchParams.get('q') || '';
        return HttpResponse.json({
          '@context': ['http://iiif.io/api/presentation/2/context.json', 'http://iiif.io/api/search/1/context.json'],
          '@id': `${searchUrl}?q=${query}`,
          '@type': 'sc:AnnotationList',
          hits: [],
          resources: [],
          within: {
            '@type': 'sc:Layer',
            first: `${searchUrl}?start=0`,
            ignored: [],
            last: `${searchUrl}?start=0`,
          },
        });
      }),
    );
  });

  it('renders a CompanionWindow', () => {
    createWrapper();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  });

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    createWrapper(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=Wolpertinger`]: { isFetching: false, json: contentSearchMock } },
          query: 'Wolpertinger',
        },
      },
    );

    expect(screen.getByRole('heading', { name: /Search/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset search' })).toBeInTheDocument();
  });

  it('clears the search when the Clear chip is clicked', async () => {
    const user = userEvent.setup();

    createWrapper(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=Wolpertinger`]: { isFetching: false, json: contentSearchMock } },
          query: 'Wolpertinger',
        },
      },
    );

    await user.click(screen.getByRole('button', { name: 'Reset search' }));

    expect(screen.queryByRole('button', { name: 'Reset search' })).not.toBeInTheDocument();
  });

  it('does not render a Clear chip if there is no search query to be cleared', () => {
    createWrapper();

    expect(screen.queryByRole('button', { name: 'Reset search' })).not.toBeInTheDocument();
  });

  it('has the SearchPanelControls component', () => {
    createWrapper();

    expect(screen.getByRole('combobox', { name: 'search terms' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search in the document' })).toBeInTheDocument();
  });

  it('has the SearchResults list', () => {
    createWrapper();

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('suggests searches, encodes special characters in the request URL, and renders results', async () => {
    const user = userEvent.setup();
    expect(searchUrl).toBeDefined();
    let requestedUrl;

    server.use(
      http.get(searchUrl, ({ request }) => {
        requestedUrl = request.url;
        return HttpResponse.json(contentSearchMock);
      }),
    );

    createWrapper({}, { window: { suggestedSearches: ['Dry Cleaning & Laundry'] } });

    const suggestionBtn = screen.getByRole('button', {
      name: 'Search this document for "Dry Cleaning & Laundry"',
    });
    expect(suggestionBtn).toBeInTheDocument();

    await user.click(suggestionBtn);

    const hits = await screen.findAllByRole('listitem');
    expect(hits).toHaveLength(3);
    expect(hits[0]).toHaveTextContent('1');
    expect(hits[0]).toHaveTextContent('Dry Cleaning');
    expect(hits[0]).toHaveTextContent(/& Laundry - \(Located at side of Medical Building\)/);

    // Verify special characters and spaces were URL-encoded in the request
    expect(requestedUrl).toBe(`${searchUrl}?q=Dry+Cleaning+%26+Laundry`);
  });

  it('does not suggest searches if the user has made a query', () => {
    createWrapper(
      {},
      {
        search: {
          data: { [`${searchUrl}?q=blah`]: { isFetching: false, json: contentSearchMock } },
          query: 'blah',
        },
        window: { suggestedSearches: ['NSF'] },
      },
    );

    expect(screen.queryByRole('button', { name: 'Search this document for "NSF"' })).not.toBeInTheDocument();
  });
});

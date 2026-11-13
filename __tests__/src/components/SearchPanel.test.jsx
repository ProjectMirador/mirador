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
  it('renders a CompanionWindow', () => {
    createWrapper();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  });

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    createWrapper({}, { search: { query: 'Wolpertinger' } });

    expect(screen.getByRole('heading', { name: /Search/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset search' })).toBeInTheDocument();
  });

  it('clears the search when the Clear chip is clicked', async () => {
    const user = userEvent.setup();

    createWrapper({}, { search: { query: 'Wolpertinger' } });

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
    const searchUrl = manifestFixtureFg165hz3589.service.at(0)['@id'];
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

    // TODO: unify these tests to expect 3 results rather than 1+2 once we address SearchHit's DOM structure
    // Verify the first hit (auto-selected listitem) renders its counter, highlight, and snippet
    const firstHit = within(await screen.findByRole('listitem'));
    expect(firstHit.getByText('1')).toBeInTheDocument();
    expect(firstHit.getByText('Dry Cleaning')).toBeInTheDocument();
    expect(firstHit.getByText(/^& Laundry - \(Located at side of Medical Building\)/)).toBeInTheDocument();

    // Verify the remaining two unselected hits render as clickable buttons
    const unselectedHits = screen.getAllByRole('button', { name: /Dry Cleaning/i });
    expect(unselectedHits).toHaveLength(2);

    // Verify special characters and spaces were URL-encoded in the request
    expect(requestedUrl).toBe(`${searchUrl}?q=Dry+Cleaning+%26+Laundry`);
  });

  it('does not suggest searches if the user has made a query', () => {
    createWrapper(
      {},
      {
        search: { query: 'blah' },
        window: { suggestedSearches: ['NSF'] },
      },
    );

    expect(screen.queryByRole('button', { name: 'Search this document for "NSF"' })).not.toBeInTheDocument();
  });
});

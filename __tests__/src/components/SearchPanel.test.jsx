import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server, useMsw } from '../../mocks/server';
import { contentSearchMock } from '../../mocks/contentSearchMock';
import SearchPanel from '../../../src/containers/SearchPanel';
import manifestFixtureFg165hz3589 from '../../fixtures/version-2/fg165hz3589.json';

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
  // TODO: remove after migration off vitest-fetch-mock
  useMsw();

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

  it('suggests searches and renders results from the API', async () => {
    const user = userEvent.setup();

    createWrapper({}, { window: { suggestedSearches: ['Dry Cleaning & Laundry'] } });

    const suggestionBtn = screen.getByRole('button', {
      name: 'Search this document for "Dry Cleaning & Laundry"',
    });
    expect(suggestionBtn).toBeInTheDocument();

    await user.click(suggestionBtn);

    expect((await screen.findAllByText(/Dry Cleaning/i)).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Laundry/i).length).toBeGreaterThan(0);
  });

  it('encodes special characters in suggested search URLs and renders results', async () => {
    const user = userEvent.setup();
    const searchUrl = manifestFixtureFg165hz3589.service[0]['@id'];
    let requestedUrl;
    console.log(contentSearchMock);

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

    // The results rendered (including the '&' in the snippet)
    expect(await screen.findByText('Dry Cleaning')).toBeInTheDocument();
    expect(screen.getByText(/^& Laundry - \(Located at side of Medical Building\)/)).toBeInTheDocument();

    // 2The special character '&' and spaces were URL-encoded in the request
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

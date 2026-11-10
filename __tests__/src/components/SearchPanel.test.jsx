import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { contentSearchMock } from '../../mocks/contentSearchMock';
import SearchPanel from '../../../src/containers/SearchPanel';

/**
 * Helper function to wrap the Redux-connected SearchPanel
 */
function createWrapper(props = {}, preloadedState = {}) {
  const { windows: windowsState, ...restState } = preloadedState;

  return render(
    <SearchPanel
      id="xyz"
      windowId="window"
      {...props}
    />,
    {
      preloadedState: {
        companionWindows: { xyz: { content: 'search' } },
        manifests: {
          'manifest.stanford.edu/test1': {
            id: 'manifest.stanford.edu/test1',
            json: {
              '@context': 'http://iiif.io/api/presentation/2/context.json',
              '@id': 'manifest.stanford.edu/test1',
              '@type': 'sc:Manifest',
              sequences: [
                {
                  canvases: [
                    { '@id': 'https://stanford.edu', label: 'Page 1' },
                    { '@id': 'https://stanford.edu', label: 'Page 2' },
                    { '@id': 'https://stanford.edu', label: 'Page 5' },
                  ],
                },
              ],
              service: {
                '@context': 'http://iiif.io/api/search/1/context.json',
                '@id': 'https://stanford.edu/content-search',
                profile: 'http://iiif.io/api/search/1/search',
              },
            },
          },
        },
        
        windows: {
          window: {
            id: 'window',
            manifestId: 'manifest.stanford.edu/test1',
            ...windowsState?.window,
          },
        },
        ...restState,
      },
    },
  );
}



describe('SearchPanel', () => {
  it('renders a CompanionWindow', () => {
    createWrapper();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
  });

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    createWrapper(
      {},
      { searches: { window: { xyz: { data: {}, query: 'Wolpertinger' } } } },
    );

    expect(screen.getByRole('heading', { name: /Search/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset search' })).toBeInTheDocument();
  });

  it('clears the search when the Clear chip is clicked', async () => {
    const user = userEvent.setup();

    createWrapper(
      {},
      { searches: { window: { xyz: { data: {}, query: 'Wolpertinger' } } } },
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

  it('suggests searches and renders results from the API', async () => {
    const user = userEvent.setup();

    createWrapper(
      {},
      {
        windows: {
          window: { suggestedSearches: ['NSF'] },
        },
      },
    );

    const suggestionBtn = screen.getByRole('button', { name: 'Search this document for "NSF"' });
    expect(suggestionBtn).toBeInTheDocument();

    await user.click(suggestionBtn);

    expect(await screen.findByText(/ROAD CODE BOOK/i)).toBeInTheDocument();
    expect(screen.getAllByText('NSF').length).toBeGreaterThan(0);
  });

  it('encodes special characters in suggested search URLs and renders results', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('https://stanford.edu/content-search', ({ request }) => {
        // expect(request.url).toBe('https://stanford.edu/content-search?q=hel%5Elo');

        return HttpResponse.json({
          ...contentSearchMock,
          hits: [{ ...contentSearchMock.hits[0], match: 'hel^lo' }],
        });
      }),
    );

    createWrapper(
      {},
      {
        windows: {
          window: { suggestedSearches: ['hel^lo'] },
        },
      },
    );

    const suggestionBtn = screen.getByRole('button', { name: 'Search this document for "hel^lo"' });
    expect(suggestionBtn).toBeInTheDocument();

    await user.click(suggestionBtn);

    expect(await screen.findByText(/ROAD CODE BOOK/i)).toBeInTheDocument();
    expect(screen.getByText('hel^lo')).toBeInTheDocument();
  });

  it('does not suggest searches if the user has made a query', () => {
    createWrapper(
      {},
      {
        searches: {
          window: {
            xyz: { data: {}, query: 'blah' },
          },
        },
        windows: {
          window: { suggestedSearches: ['NSF'] },
        },
      },
    );

    expect(screen.queryByRole('button', { name: 'Search this document for "NSF"' })).not.toBeInTheDocument();
  });
});

import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { SearchPanel } from '../../../src/components/SearchPanel';

/**
 * Helper function to create a shallow wrapper around SearchPanel
 */
function createWrapper(props) {
  return render(
    <SearchPanel
      id="xyz"
      fetchSearch={() => {}}
      searchService={{ id: 'http://example.com/search' }}
      windowId="window"
      {...props}
    />,
    { preloadedState: { companionWindows: { xyz: { content: 'search' } } } },
  );
}

describe('SearchPanel', () => {
  it('renders a CompanionWindow', () => {
    createWrapper();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'searchTitle' })).toBeInTheDocument();
  });

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    createWrapper({ query: 'Wolpertinger' });

    expect(screen.getByRole('heading', { name: /searchTitle/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'clearSearch' })).toBeInTheDocument();
  });

  it('the Clear chip calls the removeSearch prop', async () => {
    const user = userEvent.setup();
    const removeSearch = jest.fn();

    createWrapper({ query: 'Wolpertinger', removeSearch });

    await user.click(screen.getByRole('button', { name: 'clearSearch' }));

    expect(removeSearch).toHaveBeenCalled();
  });

  it('does not render a Clear chip if there is no search query to be cleared', () => {
    createWrapper();

    expect(screen.queryByRole('button', { name: 'clearSearch' })).not.toBeInTheDocument();
  });

  it('has the SearchPanelControls component', () => {
    createWrapper();

    expect(screen.getByRole('textbox', { name: 'searchInputLabel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'searchSubmitAria' })).toBeInTheDocument();
  });

  it('has the SearchResults list', () => {
    createWrapper();

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('suggests searches', async () => {
    const user = userEvent.setup();
    const fetchSearch = jest.fn();
    createWrapper({
      fetchSearch, query: '', suggestedSearches: ['abc'], t: i18next.t,
    });

    expect(screen.getByRole('button', { name: 'Search this document for "abc"' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Search this document for "abc"' }));
    expect(fetchSearch).toHaveBeenCalledWith('http://example.com/search?q=abc', 'abc');
  });

  it('does not suggest searches if the user has made a query', () => {
    const fetchSearch = jest.fn();
    createWrapper({ fetchSearch, query: 'blah', suggestedSearches: ['abc'] });

    expect(screen.queryByRole('button', { name: 'Search this document for "abc"' })).not.toBeInTheDocument();
  });
});

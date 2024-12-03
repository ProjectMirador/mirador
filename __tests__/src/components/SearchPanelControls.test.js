import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';

import { SearchPanelControls } from '../../../src/components/SearchPanelControls';

/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return render(
    <SearchPanelControls
      companionWindowId="cw"
      windowId="window"
      {...props}
    />,
  );
}

describe('SearchPanelControls', () => {
  it('renders a form', () => {
    createWrapper();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits a search when an autocomplete suggestion is picked', async () => {
    const user = userEvent.setup();
    const fetchSearch = jest.fn();
    fetch.mockResponse(JSON.stringify({ terms: ['somestring 12345'] }));

    createWrapper({
      autocompleteService: { id: 'http://example.com/autocomplete' },
      fetchSearch,
      searchService: { id: 'http://example.com/search', options: { resource: { id: 'abc' } } },
    });

    await user.click(screen.getByRole('combobox'));
    await user.keyboard('somestring');
    await user.click(await screen.findByText('somestring 12345'));
    expect(fetchSearch).toHaveBeenCalledWith('window', 'cw', 'http://example.com/search?q=somestring+12345', 'somestring 12345');
    fetch.resetMocks();
  });
  it('should fetch result only once', async () => {
    const fetchSearch = jest.fn();
    const user = userEvent.setup();

    createWrapper({
      autocompleteService: { id: 'http://example.com/autocomplete' },
      fetchSearch,
      searchService: { id: 'http://example.com/search', options: { resource: { id: 'abc' } } },
    });

    await user.click(screen.getByRole('combobox'));
    await user.keyboard('somestring');
    await user.keyboard('{Enter}');
    expect(fetchSearch).toHaveBeenCalledTimes(1);
  });

  it('renders a text input through the renderInput prop', () => {
    createWrapper();

    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'search-cw');
  });
  it('endAdornment is a SearchIcon (with no CircularProgress indicator)', () => {
    createWrapper();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument(); // eslint-disable-line testing-library/no-node-access
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('endAdornment has a CircularProgress indicator when there the current search is fetching', () => {
    createWrapper({ searchIsFetching: true });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('form change and submission triggers an action', async () => {
    const user = userEvent.setup();
    const fetchSearch = jest.fn();
    const searchService = {
      id: 'http://www.example.com/search',
      options: { resource: { id: 'example.com/manifest' } },
    };
    createWrapper({ fetchSearch, query: 'asdf', searchService });

    await user.clear(screen.getByRole('combobox'));
    await user.keyboard('yolo');
    await user.click(screen.getByRole('button'));

    expect(fetchSearch).toHaveBeenCalledWith('window', 'cw', 'http://www.example.com/search?q=yolo', 'yolo');
  });

  it('does not submit an empty search', async () => {
    const user = userEvent.setup();
    const fetchSearch = jest.fn();
    const searchService = {
      id: 'http://www.example.com/search',
      options: { resource: { id: 'example.com/manifest' } },
    };

    createWrapper({ fetchSearch, query: '', searchService });

    await user.clear(screen.getByRole('combobox'));
    await user.click(screen.getByRole('button', { name: 'searchSubmitAria' }));
    expect(fetchSearch).not.toHaveBeenCalled();
  });

  describe('input', () => {
    it('has the query prop has the input value on intial render', () => {
      createWrapper({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');
    });

    it('clears the local search state/input when the incoming query prop has been cleared', () => {
      const wrapper = createWrapper({ query: 'Wolpertinger' });
      expect(screen.getByRole('combobox')).toHaveValue('Wolpertinger');

      wrapper.rerender((
        <SearchPanelControls
          companionWindowId="cw"
          windowId="window"
          query=""
        />
      ));

      expect(screen.getByRole('combobox')).toHaveValue('');
    });
  });
});

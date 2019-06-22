import React from 'react';
import { shallow } from 'enzyme';
import Downshift from 'downshift';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { SearchPanelControls } from '../../../src/components/SearchPanelControls';


/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return shallow(
    <SearchPanelControls
      companionWindowId="cw"
      windowId="window"
      {...props}
    />,
  );
}

describe('SearchPanelControls', () => {
  it('renders a form and navigation', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('Connect(WithStyles(WithPlugins(SearchPanelNavigation)))').length).toEqual(1);
  });
  it('submits a search when an autocomplete suggestion is picked', () => {
    const fetchSearch = jest.fn();
    const wrapper = createWrapper({
      fetchSearch,
      searchService: { id: 'http://example.com/search', options: { resource: { id: 'abc' } } },
    });
    const value = 'somestring';
    wrapper.find(Downshift).prop('onSelect')(value);
    expect(wrapper.state().search).toEqual(value);
    expect(fetchSearch).toHaveBeenCalledWith(
      'window', 'cw', 'http://example.com/search?q=somestring', 'somestring',
    );
  });
  it('renders a text input', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Downshift).prop('id')).toEqual('search-cw');
  });
  it('endAdornment is a SearchIcon (with no CircularProgress indicator)', () => {
    const wrapper = createWrapper();
    const divedInput = wrapper.find(Downshift).dive().find(TextField).dive()
      .dive()
      .find(Input)
      .dive()
      .dive()
      .dive()
      .dive();
    expect(divedInput.find(CircularProgress).length).toEqual(0);
    expect(divedInput.find('SearchSharpIcon').length).toEqual(1);
    expect(divedInput.find('Connect(WithPlugins(MiradorMenuButton))[type="submit"]').length).toEqual(1);
  });

  it('endAdornment has a CircularProgress indicator when there the current search is fetching', () => {
    const wrapper = createWrapper({ searchIsFetching: true });
    const divedInput = wrapper.find(Downshift).dive().find(TextField).dive()
      .dive()
      .find(Input)
      .dive()
      .dive()
      .dive()
      .dive();
    expect(divedInput.find(CircularProgress).length).toEqual(1);
  });

  it('renders suggestions', () => {
    const fetchSearch = jest.fn();
    const wrapper = createWrapper({
      fetchSearch,
      searchService: { id: 'http://example.com/search', options: { resource: { id: 'abc' } } },
      selectOpen: true,
    });
    wrapper.setState({ search: 'yolo', suggestions: [{ match: 'abc' }] });
    const divedInput = wrapper.find(Downshift).dive();
    expect(divedInput.find(MenuItem).length).toEqual(1);
    expect(divedInput.find(MenuItem).text()).toEqual('abc');
    divedInput.find(MenuItem).simulate('click', {});
    expect(wrapper.state().search).toBe('abc');
  });

  it('form change and submission triggers an action', () => {
    const fetchSearch = jest.fn();
    const searchService = {
      id: 'http://www.example.com/search',
      options: { resource: { id: 'example.com/manifest' } },
    };
    const wrapper = createWrapper({ fetchSearch, searchService });
    wrapper.setState({ search: 'asdf' });

    wrapper.setState({ search: 'yolo' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(fetchSearch).toHaveBeenCalledWith('window', 'cw', 'http://www.example.com/search?q=yolo', 'yolo');
    expect(wrapper.state().search).toBe('yolo');
  });

  it('does not submit an empty search', () => {
    const fetchSearch = jest.fn();
    const searchService = {
      id: 'http://www.example.com/search',
      options: { resource: { id: 'example.com/manifest' } },
    };
    const wrapper = createWrapper({ fetchSearch, searchService });
    wrapper.setState({ search: '' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(fetchSearch).not.toHaveBeenCalled();
  });

  describe('input', () => {
    it('has the query prop has the input value on intial render', () => {
      const wrapper = createWrapper({ query: 'Wolpertinger' });

      expect(wrapper.find(Downshift).props().inputValue).toEqual('Wolpertinger');
    });

    it('clears the local search state/input when the incoming query prop has been cleared', () => {
      const wrapper = createWrapper({ query: 'Wolpertinger' });

      expect(wrapper.state().search).toEqual('Wolpertinger');
      wrapper.setProps({ query: '' });
      expect(wrapper.state().search).toEqual('');
      expect(wrapper.find(Downshift).props().inputValue).toEqual('');
    });
  });
});

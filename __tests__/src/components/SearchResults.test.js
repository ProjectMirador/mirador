import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { SearchResults } from '../../../src/components/SearchResults';
import { ScrollTo } from '../../../src/components/ScrollTo';


/**
 * Helper function to create a shallow wrapper around SearchResults
 */
function createWrapper(props) {
  return shallow(
    <SearchResults
      companionWindowId="cwid"
      windowId="window"
      query="query"
      selectedContentSearchAnnotation={['foo']}
      searchHits={[
        {
          after: ', and start the chainsaw',
          annotations: ['foo'],
          before: 'Light up the',
          match: 'moose',
        },
      ]}
      {...props}
    />,
  );
}

describe('SearchResults', () => {
  it('renders a SearchHit for each hit', () => {
    const selectContentSearchAnnotation = jest.fn();
    const wrapper = createWrapper({ selectContentSearchAnnotation });
    const searchHits = wrapper.find('LiveMessenger').props().children({});

    expect(searchHits.length).toEqual(1);
    expect(searchHits[0].type.displayName).toEqual('Connect(WithStyles(WithPlugins(SearchHit)))');
    expect(searchHits[0].props.index).toEqual(0);
  });

  it('can focus on a single item', () => {
    const wrapper = createWrapper({});
    const searchHits = wrapper.find('LiveMessenger').props().children({});

    searchHits[0].props.showDetails();
    expect(wrapper.state().focused).toEqual(true);
  });

  it('can return to the full list view', () => {
    const wrapper = createWrapper({});
    wrapper.setState({ focused: true });
    expect(wrapper.find(ScrollTo).prop('scrollTo')).toEqual(true);
    expect(wrapper.find(Button).text()).toEqual('backToResults');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state().focused).toEqual(false);
  });

  it('passes announcePolite function to the SearchHits', () => {
    const announcePolite = jest.fn();
    const wrapper = createWrapper({});
    const searchHits = wrapper.find('LiveMessenger').props().children({ announcePolite });

    expect(searchHits[0].props.announcer).toEqual(announcePolite);
  });

  describe('annotation-only search results', () => {
    it('renders a SearchHit for each annotation', () => {
      const wrapper = createWrapper({
        searchAnnotations: [{ id: 'x' }, { id: 'y' }],
        searchHits: [],
      });

      const searchHits = wrapper.find('LiveMessenger').props().children({});
      expect(searchHits.length).toEqual(2);
      expect(searchHits[0].props.index).toEqual(0);
      expect(searchHits[0].props.annotationId).toEqual('x');

      expect(searchHits[1].props.index).toEqual(1);
      expect(searchHits[1].props.annotationId).toEqual('y');
    });
  });

  describe('no search results', () => {
    it('shows no results', () => {
      const wrapper = createWrapper({
        isFetching: false,
        query: 'nope',
        searchHits: [],
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').text()).toEqual('searchNoResults');
    });
    it('with hits', () => {
      const wrapper = createWrapper({
        isFetching: false,
        query: 'nope',
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').length).toEqual(0);
    });
    it('while fetching', () => {
      const wrapper = createWrapper({
        isFetching: true,
        query: 'nope',
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').length).toEqual(0);
    });
    it('without a query', () => {
      const wrapper = createWrapper({
        isFetching: false,
        query: '',
      });
      expect(wrapper.find('WithStyles(ForwardRef(Typography))').length).toEqual(0);
    });
  });

  describe('multi-page search results', () => {
    it('shows a button to request the next page', () => {
      const fetchSearch = jest.fn();
      const wrapper = createWrapper({
        fetchSearch,
        nextSearch: 'search?page=2',
      });

      expect(wrapper.find(Button).length).toEqual(1);
      wrapper.find(Button).simulate('click');

      expect(fetchSearch).toHaveBeenCalledWith('window', 'cwid', 'search?page=2', 'query');
    });
  });
});

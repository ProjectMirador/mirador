import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { SearchResults } from '../../../src/components/SearchResults';


/**
 * Helper function to create a shallow wrapper around SearchResults
 */
function createWrapper(props) {
  return shallow(
    <SearchResults
      windowId="window"
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
    expect(wrapper.find('Connect(WithStyles(WithPlugins(SearchHit)))').length).toEqual(1);
    expect(wrapper.find('Connect(WithStyles(WithPlugins(SearchHit)))').prop('index')).toEqual(0);
  });

  it('can focus on a single item', () => {
    const wrapper = createWrapper({});
    wrapper.find('Connect(WithStyles(WithPlugins(SearchHit)))').prop('showDetails')();
    expect(wrapper.state().focused).toEqual(true);
  });

  it('can return to the full list view', () => {
    const wrapper = createWrapper({});
    wrapper.setState({ focused: true });
    expect(wrapper.find(Button).text()).toEqual('backToResults');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state().focused).toEqual(false);
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
});

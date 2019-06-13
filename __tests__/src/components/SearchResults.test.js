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
  it('renders a ListItem for each hit', () => {
    const selectContentSearchAnnotation = jest.fn();
    const wrapper = createWrapper({ selectContentSearchAnnotation });
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').length).toEqual(1);
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').prop('selected')).toEqual(true);
    expect(wrapper.find('WithStyles(ForwardRef(ListItemText))').render().text()).toEqual('Light up the moose , and start the chainsaw more');
    expect(wrapper.find('strong').length).toEqual(1);

    wrapper.find('WithStyles(ForwardRef(ListItem))').simulate('click');
    expect(selectContentSearchAnnotation).toHaveBeenCalledWith('window', ['foo']);
  });

  it('can focus on a single item', () => {
    const wrapper = createWrapper({});
    expect(wrapper.find(Button).text()).toEqual('more');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state().focused).toEqual(true);
  });

  it('can return to the full list view', () => {
    const wrapper = createWrapper({});

    wrapper.setState({ focused: true });
    expect(wrapper.find(Button).text()).toEqual('backToResults');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state().focused).toEqual(false);
  });
});

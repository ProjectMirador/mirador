import React from 'react';
import { shallow } from 'enzyme';
import { SearchHit } from '../../../src/components/SearchHit';


/**
 * Helper function to create a shallow wrapper around SearchResults
 */
function createWrapper(props) {
  return shallow(
    <SearchHit
      hit={{
        after: ', and start the chainsaw',
        annotations: ['foo'],
        before: 'Light up the',
        match: 'moose',
      }}
      windowId="window"
      selected
      index={0}
      {...props}
    />,
  );
}

describe('SearchHit', () => {
  it('renders a ListItem for each hit', () => {
    const selectContentSearchAnnotation = jest.fn();
    const wrapper = createWrapper({ selectContentSearchAnnotation });
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').length).toEqual(1);
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').prop('selected')).toEqual(true);
    expect(wrapper.find('WithStyles(ForwardRef(ListItemText))').render().text()).toEqual('1Light up the moose , and start the chai more');
    expect(wrapper.find('strong').length).toEqual(1);

    wrapper.find('WithStyles(ForwardRef(ListItem))').simulate('click');
    expect(selectContentSearchAnnotation).toHaveBeenCalledWith('window', ['foo']);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import { SearchResults } from '../../../src/components/SearchResults';


/**
 * Helper function to create a shallow wrapper around SearchResults
 */
function createWrapper(props) {
  return shallow(
    <SearchResults
      windowId="window"
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
    const wrapper = createWrapper();
    expect(wrapper.find('WithStyles(ForwardRef(ListItem))').length).toEqual(1);
    expect(wrapper.find('WithStyles(ForwardRef(ListItemText))').render().text()).toEqual('Light up the moose , and start the chainsaw');
    expect(wrapper.find('strong').length).toEqual(1);
  });
});

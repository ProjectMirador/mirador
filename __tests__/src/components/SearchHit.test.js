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
    expect(wrapper.find('WithStyles(ForwardRef(ListItemText))').render().text()).toEqual('1Light up the moose , and start the chai ');
    expect(wrapper.find('strong').length).toEqual(1);

    wrapper.find('WithStyles(ForwardRef(ListItem))').simulate('click');
    expect(selectContentSearchAnnotation).toHaveBeenCalledWith('window', ['foo']);
  });

  describe('Annotation Labels', () => {
    it('renders the annotationLabel if present', () => {
      const wrapper = createWrapper({ annotationLabel: 'The Anno Label' });

      expect(wrapper.find('WithStyles(ForwardRef(Typography))[variant="subtitle2"][children="The Anno Label"]').length).toEqual(1);
    });

    it('does not render the typography if no annotation label is present', () => {
      const wrapper = createWrapper();

      expect(wrapper.find('WithStyles(ForwardRef(Typography))[variant="subtitle2"]').length).toEqual(0);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
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
  it('renders a text input', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('WithStyles(WithFormControlContext(ForwardRef(InputLabel)))');
    const input = wrapper.find('WithStyles(ForwardRef(Input))');
    expect(label.props()).toMatchObject({ htmlFor: 'search-cw' });
    expect(label.text()).toEqual('searchInputLabel');
    expect(input.props()).toMatchObject({ id: 'search-cw' });
  });
  it('endAdornment is a SearchIcon', () => {
    const wrapper = createWrapper();
    const divedInput = wrapper.find('WithStyles(ForwardRef(Input))')
      .dive().dive().dive()
      .dive();
    expect(divedInput.find('SearchSharpIcon').length).toEqual(1);
  });
  it('form and form submit is available', () => {
    const wrapper = createWrapper();
    const divedInput = wrapper.find('WithStyles(ForwardRef(Input))')
      .dive().dive().dive()
      .dive();
    expect(wrapper.find('form').length).toEqual(1);
    expect(divedInput.find('WithStyles(ForwardRef(IconButton))[type="submit"]').length).toEqual(1);
  });
  it('form change and submission triggers an action', () => {
    const fetchSearch = jest.fn();
    const searchService = {
      id: 'http://www.example.com/search',
    };
    const wrapper = createWrapper({ fetchSearch, searchService });
    wrapper.setState({ search: 'asdf' });

    wrapper.setState({ search: 'yolo' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(fetchSearch).toHaveBeenCalledWith('window', 'cw', 'http://www.example.com/search?q=yolo', 'yolo');
    expect(wrapper.state().search).toBe('yolo');
  });

  describe('input', () => {
    it('has the query prop has the input value on intial render', () => {
      const wrapper = createWrapper({ query: 'Wolper' });

      expect(wrapper.find('WithStyles(ForwardRef(Input))').props().value).toEqual('Wolper');
    });

    it('clears the local search state/input when the incoming query prop has been cleared', () => {
      const wrapper = createWrapper({ query: 'Wolper' });

      expect(wrapper.state().search).toEqual('Wolper');
      wrapper.setProps({ query: '' });
      expect(wrapper.state().search).toEqual('');
      expect(wrapper.find('WithStyles(ForwardRef(Input))').props().value).toEqual('');
    });
  });
});

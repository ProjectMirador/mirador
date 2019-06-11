import React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelControls } from '../../../src/components/SearchPanelControls';


/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return shallow(
    <SearchPanelControls
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
    expect(label.props()).toMatchObject({ htmlFor: 'search-window' });
    expect(label.text()).toEqual('searchInputLabel');
    expect(input.props()).toMatchObject({ id: 'search-window' });
  });
  it('endAdornment is a SearchIcon', () => {
    const wrapper = createWrapper();
    const divedInput = wrapper.find('WithStyles(ForwardRef(Input))')
      .dive().dive().dive()
      .dive();
    expect(divedInput.find('SearchSharpIcon').length).toEqual(1);
  });
});

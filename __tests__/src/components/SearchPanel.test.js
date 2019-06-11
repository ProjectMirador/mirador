import React from 'react';
import { shallow } from 'enzyme';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import { SearchPanel } from '../../../src/components/SearchPanel';


/**
 * Helper function to create a shallow wrapper around AttributionPanel
 */
function createWrapper(props) {
  return shallow(
    <SearchPanel
      id="xyz"
      windowId="window"
      {...props}
    />,
  );
}

describe('SearchPanel', () => {
  it('renders a CompanionWindow', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionWindow).length).toEqual(1);
  });
  it('has the SearchPanelControls component', () => {
    const titleControls = createWrapper().prop('titleControls');
    expect(titleControls.type.displayName).toEqual('Connect(WithStyles(WithPlugins(SearchPanelControls)))');
  });
});

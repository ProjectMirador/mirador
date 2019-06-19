import React from 'react';
import { shallow } from 'enzyme';
import CompanionWindow from '../../../src/containers/CompanionWindow';
import SearchResults from '../../../src/containers/SearchResults';
import { SearchPanel } from '../../../src/components/SearchPanel';


/**
 * Helper function to create a shallow wrapper around SearchPanel
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

  it('passes a Clear chip as the CompanionWindow title prop', () => {
    const wrapper = createWrapper({ query: 'Wolpertinger' });

    const title = wrapper.find(CompanionWindow).props().title.props.children;
    expect(title[0]).toEqual('searchTitle');
    expect(title[1].type.displayName).toEqual('WithStyles(ForwardRef(Chip))');
  });

  it('the Clear chip calls the removeSearch prop', () => {
    const removeSearch = jest.fn();
    const wrapper = createWrapper({ query: 'Wolpertinger', removeSearch });
    const chip = wrapper.find(CompanionWindow).props().title.props.children[1];

    chip.props.onClick();
    expect(removeSearch).toHaveBeenCalled();
  });

  it('does not render a Clear chip if there is no search query to be cleared', () => {
    const wrapper = createWrapper();

    const title = wrapper.find(CompanionWindow).props().title.props.children;
    expect(title[0]).toEqual('searchTitle');
    expect(title[1]).toEqual('');
  });

  it('has the SearchPanelControls component', () => {
    const titleControls = createWrapper().find(CompanionWindow).prop('titleControls');
    expect(titleControls.type.displayName).toEqual('Connect(WithStyles(WithPlugins(SearchPanelControls)))');
  });
  it('has the SearchResults', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(SearchResults).length).toEqual(1);
  });
});

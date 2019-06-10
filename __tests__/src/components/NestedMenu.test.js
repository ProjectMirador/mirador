import React from 'react';
import { shallow } from 'enzyme';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { NestedMenu } from '../../../src/components/NestedMenu';

/**
 * Helper function to wrap creating a NestedMenu component
*/
function createWrapper(props) {
  return shallow(
    <NestedMenu
      icon={<>GivenIcon</>}
      label="GivenLabel"
      {...props}
    >
      <>GivenChildren</>
    </NestedMenu>,
  );
}

describe('NestedMenu', () => {
  let wrapper;

  it('renders the given icon wrapped in a MUI ListItemIcon', () => {
    wrapper = createWrapper();

    expect(wrapper.find(ListItemIcon).children().text()).toEqual('GivenIcon');
  });

  it('does not render a ListItemIcon if no icon prop is passed', () => {
    wrapper = createWrapper({ icon: null });

    expect(wrapper.find(ListItemIcon).length).toBe(0);
  });

  it('renders the given label wrapped in a MUI Typography', () => {
    wrapper = createWrapper();

    expect(wrapper.find(ListItemText).children().text()).toEqual('GivenLabel');
  });

  it('toggles the local nestedMenuIsOpen state when clicking the MenuItem', () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    wrapper.find(MenuItem).simulate('click');
    expect(wrapper.state().nestedMenuIsOpen).toBe(true);
    wrapper.find(MenuItem).simulate('click');
    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
  });

  it('spreads options to the MenuItem', () => {
    wrapper = createWrapper({ divider: true });

    expect(wrapper.find(MenuItem).props().divider).toBe(true);
  });

  it('renders the appropriate expand/collapse icon based on the menu open state', () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    expect(wrapper.find('ExpandMoreSharpIcon').length).toBe(1);
    expect(wrapper.find('ExpandLessSharpIcon').length).toBe(0);
    wrapper.setState({ nestedMenuIsOpen: true });
    expect(wrapper.find('ExpandMoreSharpIcon').length).toBe(0);
    expect(wrapper.find('ExpandLessSharpIcon').length).toBe(1);
  });

  it("renders the component's children based on the nestedMenuIsOpen state", () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.children().text()).not.toMatch(/GivenChildren/);

    wrapper.setState({ nestedMenuIsOpen: true });
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.children().last().text()).toEqual('GivenChildren');
  });
});

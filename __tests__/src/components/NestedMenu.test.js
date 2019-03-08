import React from 'react';
import { shallow } from 'enzyme';
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

    expect(wrapper.find('WithStyles(ListItemIcon)').children().text()).toEqual('GivenIcon');
  });

  it('does not render a ListItemIcon if no icon prop is passed', () => {
    wrapper = createWrapper({ icon: null });

    expect(wrapper.find('WithStyles(ListItemIcon)').length).toBe(0);
  });

  it('renders the given label wrapped in a MUI Typography', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Typography)').children().text()).toEqual('GivenLabel');
  });

  it('renders the given children wrapped in a MUI Collapse', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Collapse)').children().text()).toEqual('GivenChildren');
  });

  it('toggles the local nestedMenuIsOpen state when clicking the MenuItem', () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    wrapper.find('WithStyles(MenuItem)').simulate('click');
    expect(wrapper.state().nestedMenuIsOpen).toBe(true);
    wrapper.find('WithStyles(MenuItem)').simulate('click');
    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
  });

  it('renders the appropriate expand/collapse icon based on the menu open state', () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    expect(wrapper.find('pure(ExpandMoreSharpIcon)').length).toBe(1);
    expect(wrapper.find('purl(ExpandLessSharpIcon)').length).toBe(0);
    wrapper.setState({ nestedMenuIsOpen: true });
    expect(wrapper.find('pure(ExpandMoreSharpIcon)').length).toBe(0);
    expect(wrapper.find('pure(ExpandLessSharpIcon)').length).toBe(1);
  });

  it("the MUI Collapse component's in prop is based on the nestedMenuIsOpen state", () => {
    wrapper = createWrapper();

    expect(wrapper.state().nestedMenuIsOpen).toBe(false);
    expect(wrapper.find('WithStyles(Collapse)').find({ in: false }).length).toBe(1);
    expect(wrapper.find('WithStyles(Collapse)').find({ in: true }).length).toBe(0);

    wrapper.setState({ nestedMenuIsOpen: true });
    expect(wrapper.find('WithStyles(Collapse)').find({ in: true }).length).toBe(1);
    expect(wrapper.find('WithStyles(Collapse)').find({ in: false }).length).toBe(0);
  });
});

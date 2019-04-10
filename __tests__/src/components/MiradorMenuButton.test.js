import React from 'react';
import { shallow } from 'enzyme';
import { MiradorMenuButton } from '../../../src/components/MiradorMenuButton';

/**
 * Helper function to wrap creating a MiradorMenuButton component
*/
function createWrapper(props) {
  return shallow(
    <MiradorMenuButton aria-label="The Label" containerId="mirador" {...props}>
      <>icon</>
    </MiradorMenuButton>,
  );
}

describe('MiradorMenuButton', () => {
  let wrapper;

  it('renders the given a Tooltip -> IconLabel -> Icon', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Tooltip) WithStyles(IconButton)').length).toEqual(1);
    expect(
      wrapper
        .find('WithStyles(Tooltip) WithStyles(IconButton)')
        .first()
        .children()
        .text(),
    ).toEqual('icon');
  });

  it('does not render the Tooltip if the button is disabled', () => {
    wrapper = createWrapper({ disabled: true });

    expect(wrapper.find('WithStyles(Tooltip) WithStyles(IconButton)').length).toEqual(0);
    expect(wrapper.find('WithStyles(IconButton)').length).toEqual(1);
  });

  it('uses the aria-label prop the the Tooltip title prop', () => {
    wrapper = createWrapper();

    expect(wrapper.find('WithStyles(Tooltip)').props().title).toEqual('The Label');
    expect(wrapper.find('WithStyles(Tooltip) WithStyles(IconButton)').props()['aria-label']).toEqual('The Label');
  });

  it('spreads TooltipProps to the Tooltip component', () => {
    wrapper = createWrapper({ TooltipProps: { style: { color: 'red' } } });

    expect(wrapper.find('WithStyles(Tooltip)').props().style).toEqual({ color: 'red' });
  });

  it('spreads any other props to IconButton', () => {
    wrapper = createWrapper({ color: 'inherit' });

    expect(wrapper.find('WithStyles(Tooltip) WithStyles(IconButton)').props().color).toEqual('inherit');
  });

  it('wraps the child component in a badge if the badge prop is set to true (and passes BadgeProps)', () => {
    wrapper = createWrapper({ badge: true, BadgeProps: { badgeContent: 3 } });

    expect(wrapper.find('WithStyles(Badge)').props().badgeContent).toEqual(3);
    expect(wrapper.find('WithStyles(Badge)').first().children().text()).toEqual('icon');
  });
});

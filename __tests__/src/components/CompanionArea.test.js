import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftSharpIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightSharpIcon from '@material-ui/icons/ArrowRightSharp';
import { CompanionArea } from '../../../src/components/CompanionArea';
import CompanionWindowFactory from '../../../src/containers/CompanionWindowFactory';

/** */
function createWrapper(props) {
  return shallow(
    <CompanionArea
      classes={{ horizontal: 'horizontal' }}
      windowId="abc123"
      position="right"
      companionWindows={[
        { position: 'right', id: 'foo' },
        { position: 'right', id: 'baz' },
      ]}
      {...props}
    />,
  );
}

describe('CompanionArea', () => {
  it('should render all <CompanionWindow>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(CompanionWindowFactory).length).toBe(2);
  });

  it('should add the appropriate classes when the companion area fills the full width', () => {
    const wrapper = createWrapper({ position: 'bottom' });
    expect(wrapper.find('div.horizontal').length).toBe(2);
  });

  it('should pass correct props to the <CompanionWindow> components', () => {
    const wrapper = createWrapper();
    const props = wrapper.find(CompanionWindowFactory).at(0).props();
    expect(props.id).toBe('foo');
    expect(props.windowId).toBe('abc123');
  });

  it('has a toggle to show the companion area window in the left position', () => {
    const setCompanionAreaOpen = jest.fn();

    const wrapper = createWrapper({
      position: 'left', sideBarOpen: true, setCompanionAreaOpen, companionAreaOpen: false,
    });

    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
    expect(wrapper.find('WithStyles(IconButton)').matchesElement(
      <IconButton>
        <ArrowRightSharpIcon />
      </IconButton>,
    )).toBe(true);

    expect(wrapper.find('div.mirador-companion-windows').length).toBe(1);
    expect(wrapper.find('div.mirador-companion-windows').props().style.display).toBe('none');

    wrapper.find('WithStyles(IconButton)').simulate('click');

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', true);
  });

  it('has a toggle to hide the companion area window in the left position', () => {
    const setCompanionAreaOpen = jest.fn();

    const wrapper = createWrapper({
      position: 'left', sideBarOpen: true, setCompanionAreaOpen, companionAreaOpen: true,
    });

    expect(wrapper.find('WithStyles(IconButton)').length).toBe(1);
    expect(wrapper.find('WithStyles(IconButton)').matchesElement(
      <IconButton>
        <ArrowLeftSharpIcon />
      </IconButton>,
    )).toBe(true);

    expect(wrapper.find('div.mirador-companion-windows').length).toBe(1);
    expect(wrapper.find('div.mirador-companion-windows').props().style.display).toBe('flex');

    wrapper.find('WithStyles(IconButton)').simulate('click');

    expect(setCompanionAreaOpen).toHaveBeenCalledWith('abc123', false);
  });

  it('does not show a toggle if the sidebar is collapsed', () => {
    const wrapper = createWrapper({
      position: 'left', sideBarOpen: false, setCompanionAreaOpen: () => {}, companionAreaOpen: true,
    });

    expect(wrapper.find('WithStyles(IconButton)').length).toBe(0);
  });

  it('does not show a toggle in other positions', () => {
    const wrapper = createWrapper({
      position: 'whatever', sideBarOpen: true, setCompanionAreaOpen: () => {}, companionAreaOpen: true,
    });

    expect(wrapper.find('WithStyles(IconButton)').length).toBe(0);
  });
});

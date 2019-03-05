import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import WindowTopMenu from '../../../src/containers/WindowTopMenu';
import { WindowTopMenuButton } from '../../../src/components/WindowTopMenuButton';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <WindowTopMenuButton
      windowId="xyz"
      classes={{}}
      {...props}
    />,
  );
}

describe('WindowTopMenuButton', () => {
  it('renders all needed elements', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(IconButton).length).toBe(1);
    expect(wrapper.find(MoreVertIcon).length).toBe(1);
    expect(wrapper.find(WindowTopMenu).length).toBe(1);
  });

  it('passes correct props to <WindowTopMenu/>', () => {
    const wrapper = createWrapper();
    const props = wrapper.find(WindowTopMenu).first().props();
    const { handleMenuClose } = wrapper.instance();
    expect(props.windowId).toBe('xyz');
    expect(props.anchorEl).toBe(null);
    expect(props.handleClose).toBe(handleMenuClose);
  });

  it('passes correct props to <IconButton/>', () => {
    const wrapper = createWrapper();
    const props = wrapper.find(IconButton).first().props();
    const { handleMenuClick } = wrapper.instance();
    expect(props.onClick).toBe(handleMenuClick);
  });

  it('toggles anchor element in <WindowTopMenu/> on menu open/close', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowTopMenu).first().props().anchorEl).toBe(null);

    wrapper.instance().handleMenuClick({ currentTarget: 'bubu' });
    expect(wrapper.find(WindowTopMenu).first().props().anchorEl).toBe('bubu');

    wrapper.instance().handleMenuClose();
    expect(wrapper.find(WindowTopMenu).first().props().anchorEl).toBe(null);
  });
});

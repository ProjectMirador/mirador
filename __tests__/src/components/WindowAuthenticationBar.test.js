import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import SanitizedHtml from '../../../src/containers/SanitizedHtml';
import { WindowAuthenticationBar } from '../../../src/components/WindowAuthenticationBar';

/**
 * Helper function to create a shallow wrapper around AuthenticationLogout
 */
function createWrapper(props) {
  return shallow(
    <WindowAuthenticationBar
      classes={{}}
      hasLogoutService
      confirmButton="Click here"
      label="Log in to see more"
      onConfirm={() => {}}
      status="ok"
      t={key => key}
      windowId="w"
      {...props}
    />,
  );
}

describe('AuthenticationControl', () => {
  it('renders nothing if the user is logged in and there is no logout service', () => {
    const wrapper = createWrapper({ hasLogoutService: false });
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders a non-collapsing version if there is no description', () => {
    const wrapper = createWrapper({ description: undefined, header: undefined });
    expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('Log in to see more');
    expect(wrapper.find(Button).children().text()).toEqual('Click here');
  });

  it('renders a collapsable version if there is a description', () => {
    const onConfirm = jest.fn();
    const wrapper = createWrapper({ description: 'long description', header: 'header', onConfirm });
    expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('Log in to see more');
    expect(wrapper.find(Button).at(0).find('span').text()).toEqual('continue');
    // is expandable
    expect(wrapper.find(Collapse).prop('in')).toEqual(false);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Collapse).prop('in')).toEqual(true);

    // has more information
    expect(wrapper.find(Collapse).find(SanitizedHtml).at(0).props().htmlString).toEqual('header');
    expect(wrapper.find(Collapse).find(SanitizedHtml).at(1).props().htmlString).toEqual('long description');

    // is recollapsable
    wrapper.find(DialogActions).find(Button).at(0).simulate('click');
    expect(wrapper.find(Collapse).prop('in')).toEqual(false);
    wrapper.find(Button).at(0).simulate('click');

    // starts the auth process
    wrapper.find(DialogActions).find(Button).at(1).simulate('click');
    expect(onConfirm).toHaveBeenCalled();
  });

  it('triggers an action when the confirm button is clicked', () => {
    const onConfirm = jest.fn();
    const wrapper = createWrapper({
      onConfirm,
    });

    wrapper.find(Button).simulate('click');
    expect(onConfirm).toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import SanitizedHtml from '../../../src/containers/SanitizedHtml';
import { WindowAuthenticationControl } from '../../../src/components/WindowAuthenticationControl';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <WindowAuthenticationControl
      t={key => key}
      classes={{}}
      degraded
      handleAuthInteraction={() => {}}
      label="authenticate"
      windowId="w"
      profile="http://iiif.io/api/auth/1/login"
      {...props}
    />,
  );
}

describe('WindowAuthenticationControl', () => {
  let wrapper;

  it('renders nothing if it is not degraded', () => {
    wrapper = createWrapper({ degraded: false });
    expect(wrapper.matchesElement(<></>)).toBe(true);
  });

  describe('with a non-interactive login', () => {
    it('renders failure messages', () => {
      wrapper = createWrapper({
        degraded: true,
        failureDescription: 'failure description',
        failureHeader: 'failure header',
        profile: 'http://iiif.io/api/auth/1/external',
        status: 'failed',
      });
      expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('failure header');
      expect(wrapper.find(SanitizedHtml).at(1).props().htmlString).toEqual('failure description');
      expect(wrapper.find(DialogActions)).toHaveLength(1);
      expect(wrapper.find(DialogActions).find(Button)).toHaveLength(2);
      expect(wrapper.find(DialogActions).find(Button).at(1).children()
        .text()).toEqual('retry');
    });
  });

  it('renders properly', () => {
    wrapper = createWrapper({ confirmLabel: 'some confirm label', description: 'some description' });
    expect(wrapper.find(SanitizedHtml).at(2).props().htmlString).toEqual('some description');
    expect(wrapper.find(DialogActions).find(Button)).toHaveLength(2);
    expect(wrapper.find(DialogActions).find(Button).at(1).children()
      .text()).toEqual('some confirm label');
  });

  it('hides the cancel button if there is nothing to collapose', () => {
    wrapper = createWrapper({ classes: { topBar: 'topBar' }, confirmLabel: 'some confirm label' });
    expect(wrapper.find('.topBar').children().find(Button).at(0)
      .children()
      .text()).toEqual('some confirm label');

    expect(wrapper.find(DialogActions).find(Button)).toHaveLength(0);
  });

  it('shows the auth dialog when the login button is clicked', () => {
    wrapper = createWrapper({ classes: { topBar: 'topBar' }, description: 'some description' });
    wrapper.find('.topBar').props().onClick();
    expect(wrapper.find(Collapse).props().in).toEqual(true);
  });

  it('triggers an action when the confirm button is clicked', () => {
    const handleAuthInteraction = jest.fn();
    wrapper = createWrapper({
      confirmLabel: 'some confirm label',
      description: 'some description',
      handleAuthInteraction,
      infoId: 'i',
      serviceId: 's',
    });
    wrapper.instance().setState({ open: true });
    expect(wrapper.find(Collapse).props().in).toEqual(true);

    wrapper.find(DialogActions).find(Button).at(1).simulate('click');
    expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'i', 's');
  });

  it('displays a failure message if the login has failed', () => {
    wrapper = createWrapper({
      failureDescription: 'failure description',
      failureHeader: 'failure header',
      status: 'failed',
    });

    expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('failure header');
    expect(wrapper.find(SanitizedHtml).at(1).props().htmlString).toEqual('failure description');

    expect(wrapper.find(DialogActions).find(Button)).toHaveLength(2);
    expect(wrapper.find(DialogActions).find(Button).at(1).children()
      .text()).toEqual('login');
  });

  it('displays the login messages if the user dismisses the failure messages', () => {
    wrapper = createWrapper({
      failureDescription: 'failure description',
      failureHeader: 'failure header',
      status: 'failed',
    });

    expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('failure header');
    expect(wrapper.find(SanitizedHtml).at(1).props().htmlString).toEqual('failure description');

    wrapper.find(DialogActions).find(Button).at(0).simulate('click');

    expect(wrapper.find(SanitizedHtml).at(0).props().htmlString).toEqual('authenticate');
  });
});

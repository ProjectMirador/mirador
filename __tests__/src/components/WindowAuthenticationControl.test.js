import React from 'react';
import { shallow } from 'enzyme';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { SanitizedHtml } from '../../../src/components/SanitizedHtml';
import { WindowAuthenticationControl } from '../../../src/components/WindowAuthenticationControl';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <WindowAuthenticationControl
      t={key => key}
      degraded
      handleAuthInteraction={() => {}}
      windowId="w"
      profile={{ value: 'xyz' }}
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

  it('renders properly', () => {
    wrapper = createWrapper({ confirmLabel: 'some confirm label', description: 'some description' });
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(SanitizedHtml)).toHaveLength(1);
    expect(wrapper.find(SanitizedHtml).props().htmlString).toEqual('some description');
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Button).at(1).children().text()).toEqual('some confirm label');
  });

  it('opens the auth dialog when the login button is clicked', () => {
    wrapper = createWrapper({});

    wrapper.find(Snackbar).props().action.props.onClick();
    expect(wrapper.find(Dialog).props().open).toEqual(true);
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
    expect(wrapper.find(Dialog).props().open).toEqual(true);

    wrapper.find(Button).at(1).simulate('click');
    expect(handleAuthInteraction).toHaveBeenCalledWith('w', 'i', 's');
    expect(wrapper.find(Dialog).props().open).toEqual(false);
  });
});

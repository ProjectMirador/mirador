import React from 'react';
import { shallow } from 'enzyme';
import { NewWindow } from '../../../src/components/NewWindow';
import { AuthenticationSender } from '../../../src/components/AuthenticationSender';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <AuthenticationSender
      t={key => key}
      handleInteraction={() => {}}
      {...props}
    />,
  );
}

describe('AuthenticationSender', () => {
  let wrapper;

  it('renders nothing if there is no url', () => {
    wrapper = createWrapper({});
    expect(wrapper.matchesElement(<></>)).toBe(true);
  });

  it('renders properly', () => {
    Object.defineProperty(window, 'origin', {
      value: 'http://localhost',
      writable: true,
    });
    wrapper = createWrapper({ url: 'http://example.com' });
    expect(wrapper.find(NewWindow).length).toBe(1);
    expect(wrapper.find(NewWindow).props().url).toBe('http://example.com?origin=http://localhost');
  });

  it('triggers an action when the window is unloaded', () => {
    const handleInteraction = jest.fn();
    wrapper = createWrapper({ handleInteraction, url: 'http://example.com' });
    wrapper.find(NewWindow).simulate('close');

    expect(handleInteraction).toHaveBeenCalledWith('http://example.com');
  });
});

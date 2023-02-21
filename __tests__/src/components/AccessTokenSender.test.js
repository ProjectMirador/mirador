import { shallow } from 'enzyme';
import { AccessTokenSender } from '../../../src/components/AccessTokenSender';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return shallow(
    <AccessTokenSender
      t={key => key}
      handleAccessTokenMessage={() => {}}
      {...props}
    />,
  );
}

describe('AccessTokenSender', () => {
  let wrapper;

  it('renders nothing if there is no url', () => {
    wrapper = createWrapper({});
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders properly', () => {
    Object.defineProperty(window, 'origin', {
      value: 'http://localhost',
      writable: true,
    });
    wrapper = createWrapper({ url: 'http://example.com' });
    expect(wrapper.find('IIIFIFrameCommunication').length).toBe(1);
    expect(wrapper.find('IIIFIFrameCommunication').props().src).toBe('http://example.com?origin=http://localhost&messageId=http://example.com');
  });

  it('triggers an action when the iframe sends a message', () => {
    const handleAccessTokenMessage = jest.fn();
    wrapper = createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    expect(wrapper.find('IIIFIFrameCommunication').props().handleReceiveMessage).toEqual(wrapper.instance().onReceiveAccessTokenMessage);

    wrapper.instance().onReceiveAccessTokenMessage({ data: { messageId: 'http://example.com' } });
    expect(handleAccessTokenMessage).toHaveBeenCalledWith({ messageId: 'http://example.com' });
  });

  it('ignores iframe messages with the wrong messageId', () => {
    const handleAccessTokenMessage = jest.fn();
    wrapper = createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    wrapper.instance().onReceiveAccessTokenMessage({ data: { messageId: 'http://example.com/123' } });
    expect(handleAccessTokenMessage).not.toHaveBeenCalled();
  });
});

import { render } from 'test-utils';
import { AccessTokenSender } from '../../../src/components/AccessTokenSender';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return render(
    <AccessTokenSender
      t={key => key}
      handleAccessTokenMessage={() => {}}
      {...props}
    />,
  );
}

describe('AccessTokenSender', () => {
  it('renders nothing if there is no url', () => {
    const { container } = createWrapper({});
    expect(container).toBeEmptyDOMElement();
  });

  it('renders properly', () => {
    const { container } = createWrapper({ url: 'http://example.com' });

    expect(container.querySelector('iframe')).toHaveAttribute('src', 'http://example.com?origin=http://localhost&messageId=http://example.com'); // eslint-disable-line testing-library/no-node-access, testing-library/no-container
  });

  it('triggers an action when the iframe sends a message', () => {
    const handleAccessTokenMessage = jest.fn();
    createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    window.dispatchEvent(new MessageEvent('message', { data: { messageId: 'http://example.com' } }));
    expect(handleAccessTokenMessage).toHaveBeenCalledWith({ messageId: 'http://example.com' });
  });

  it('ignores iframe messages with the wrong messageId', () => {
    const handleAccessTokenMessage = jest.fn();
    createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    window.dispatchEvent(new MessageEvent('message', { data: { messageId: 'http://example.com/123' } }));
    expect(handleAccessTokenMessage).not.toHaveBeenCalled();
  });
});

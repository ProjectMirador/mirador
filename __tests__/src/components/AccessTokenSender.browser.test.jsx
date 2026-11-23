import { render, screen } from '@tests/utils/test-utils';
import { AccessTokenSender } from '@src/components/AccessTokenSender';

/**
 * Helper function to create a shallow wrapper around ErrorDialog
 */
function createWrapper(props) {
  return render(<AccessTokenSender handleAccessTokenMessage={() => {}} {...props} />);
}

describe('AccessTokenSender', () => {
  it('renders nothing if there is no url', () => {
    const { container } = createWrapper({});
    expect(container).toBeEmptyDOMElement();
  });
  it('renders properly', () => {
    createWrapper({ url: 'http://example.com' });
    const expectedOrigin = encodeURIComponent(window.location.origin);

    expect(screen.getByTitle('AccessTokenSender', { hidden: true })).toHaveAttribute(
      'src',
      `http://example.com/?origin=${expectedOrigin}&messageId=http%3A%2F%2Fexample.com`,
    );
  });

  it('triggers an action when the iframe sends a message', () => {
    const handleAccessTokenMessage = vi.fn();
    createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    window.dispatchEvent(new MessageEvent('message', { data: { messageId: 'http://example.com' } }));
    expect(handleAccessTokenMessage).toHaveBeenCalledWith({ messageId: 'http://example.com' });
  });

  it('ignores iframe messages with the wrong messageId', () => {
    const handleAccessTokenMessage = vi.fn();
    createWrapper({ handleAccessTokenMessage, url: 'http://example.com' });
    window.dispatchEvent(new MessageEvent('message', { data: { messageId: 'http://example.com/123' } }));
    expect(handleAccessTokenMessage).not.toHaveBeenCalled();
  });
});

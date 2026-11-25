import { useState } from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@tests/utils/test-utils';
import { IIIFIFrameCommunication } from '@src/components/IIIFIFrameCommunication';

/** Test wrapper that surfaces received postMessage data in the DOM */
function TestHarness({ src, title = 'AccessTokenSender' }) {
  const [message, setMessage] = useState(null);

  return (
    <div>
      <IIIFIFrameCommunication src={src} title={title} handleReceiveMessage={(event) => setMessage(event.data)} />
      {message && <output data-testid="received-message">{JSON.stringify(message)}</output>}
    </div>
  );
}

TestHarness.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

describe('IIIFIFrameCommunication', () => {
  it('renders a hidden iframe with default accessibility and dimension attributes', () => {
    render(<TestHarness src="about:blank" />);

    const iframe = screen.getByTitle('AccessTokenSender', { hidden: true });
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('aria-hidden', 'true');
    expect(iframe).toHaveAttribute('width', '1');
    expect(iframe).toHaveAttribute('height', '1');
    expect(iframe).toHaveStyle({ visibility: 'hidden' });
  });

  it('receives postMessage events from the embedded iframe and updates the DOM', async () => {
    const { origin } = window.location;
    const html = `<script>window.parent.postMessage({ accessToken: 'TOKEN_HERE', messageId: '123' }, ${JSON.stringify(origin)});</script>`;
    const src = `data:text/html,${encodeURIComponent(html)}`;

    render(<TestHarness src={src} />);

    const output = await screen.findByTestId('received-message');
    expect(output).toHaveTextContent('"accessToken":"TOKEN_HERE"');
    expect(output).toHaveTextContent('"messageId":"123"');
  });

  it('cleans up the message listener on unmount', () => {
    const view = render(<TestHarness src="about:blank" />);
    expect(screen.getByTitle('AccessTokenSender', { hidden: true })).toBeInTheDocument();

    view.unmount();
    expect(screen.queryByTitle('AccessTokenSender', { hidden: true })).not.toBeInTheDocument();
  });
});

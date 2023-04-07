import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { ManifestListItemError } from '../../../src/components/ManifestListItemError';

/**
 * Helper function to wrap creating a ManifestListItemError component
*/
function createWrapper(props) {
  return render(
    <ManifestListItemError
      classes={{}}
      manifestId="http://example.com"
      onDismissClick={() => {}}
      onTryAgainClick={() => {}}
      t={key => key}
      {...props}
    />,
  );
}

describe('ManifestListItemError', () => {
  let mockFn;

  it('renders the failed manifest url and error key', () => {
    createWrapper();

    expect(screen.getByText('manifestError')).toBeInTheDocument();
    expect(screen.getByText('http://example.com')).toBeInTheDocument();
  });

  it('has a dismiss button that fires the onDismissClick prop', async () => {
    const user = userEvent.setup();
    mockFn = jest.fn();
    createWrapper({ onDismissClick: mockFn });

    await user.click(screen.getByRole('button', { name: 'dismiss' }));

    expect(mockFn).toHaveBeenCalledWith('http://example.com');
  });

  it('has a try again button that fires the onTryAgainClick prop', async () => {
    const user = userEvent.setup();
    mockFn = jest.fn();
    createWrapper({ onTryAgainClick: mockFn });

    await user.click(screen.getByRole('button', { name: 'tryAgain' }));

    expect(mockFn).toHaveBeenCalledWith('http://example.com');
  });
});

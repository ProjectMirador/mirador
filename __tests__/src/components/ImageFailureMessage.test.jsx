import { render, screen } from '@tests/utils/test-utils';
import { ImageFailureMessage } from '../../../src/components/ImageFailureMessage';
import FailedImageProvider from '../../../src/contexts/FailedImageProvider';
import FailedImageContext from '../../../src/contexts/FailedImageContext';

describe('ImageFailureMessage', () => {
  it('does not render when no images have failed', () => {
    const { container } = render(
      <FailedImageProvider>
        <ImageFailureMessage />
      </FailedImageProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders default translated message when images have failed', () => {
    // Mock the context with hasFailed: true
    const mockContext = {
      fallbackImage: 'data:image/svg+xml,...',
      hasFailed: true,
      notifyFailure: vi.fn(),
    };

    render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage />
      </FailedImageContext.Provider>,
    );

    // Should use the default English translation
    expect(screen.getByText(/Problem loading image/i)).toBeInTheDocument();
    expect(screen.getByText(/See console for details/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const mockContext = {
      fallbackImage: 'data:image/svg+xml,...',
      hasFailed: true,
      notifyFailure: vi.fn(),
    };

    render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage />
      </FailedImageContext.Provider>,
    );

    const message = screen.getByText(/Problem loading image/i);
    const container = message.closest('[role="status"]');

    expect(container).toHaveAttribute('aria-live', 'polite');
  });
});

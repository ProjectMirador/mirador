import { render, screen } from '@tests/utils/test-utils';
import { ImageFailureMessage } from '../../../src/components/ImageFailureMessage';
import FailedImageProvider from '../../../src/contexts/FailedImageProvider';
import FailedImageContext from '../../../src/contexts/FailedImageContext';

describe('ImageFailureMessage', () => {
  it('does not render when no images have failed', () => {
    const { container } = render(
      <FailedImageProvider>
        <ImageFailureMessage imageUrls={['https://example.com/image1.jpg']} />
      </FailedImageProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders message when a specific image has failed', () => {
    const mockContext = {
      failedImages: new Set(['https://example.com/image1.jpg']),
      fallbackImage: 'data:image/svg+xml,...',
      notifyFailure: vi.fn(),
    };

    render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage imageUrls={['https://example.com/image1.jpg']} />
      </FailedImageContext.Provider>,
    );

    // Should use the default English translation
    expect(screen.getByText(/Problem loading image/i)).toBeInTheDocument();
    expect(screen.getByText(/See console for details/i)).toBeInTheDocument();
  });


  it('isolates failures per window', () => {
    const mockContext = {
      failedImages: new Set(['https://example.com/manifest-a/canvas-1/image.jpg']),
      fallbackImage: 'data:image/svg+xml,...',
      notifyFailure: vi.fn(),
    };

    // Render Window A with its failed image
    const { container: containerA } = render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage imageUrls={['https://example.com/manifest-a/canvas-1/image.jpg']} />
      </FailedImageContext.Provider>,
    );

    expect(containerA).not.toBeEmptyDOMElement();
    expect(screen.getByText(/Problem loading image/i)).toBeInTheDocument();

    // Render Window B with non-failed image
    const { container: containerB } = render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage imageUrls={['https://example.com/manifest-b/canvas-1/image.jpg']} />
      </FailedImageContext.Provider>,
    );

    expect(containerB).toBeEmptyDOMElement();
  });

  it('has proper accessibility attributes', () => {
    const mockContext = {
      failedImages: new Set(['https://example.com/image1.jpg']),
      fallbackImage: 'data:image/svg+xml,...',
      notifyFailure: vi.fn(),
    };

    render(
      <FailedImageContext.Provider value={mockContext}>
        <ImageFailureMessage imageUrls={['https://example.com/image1.jpg']} />
      </FailedImageContext.Provider>,
    );

    const message = screen.getByText(/Problem loading image/i);
    const container = message.closest('[role="status"]');

    expect(container).toHaveAttribute('aria-live', 'polite');
  });
});

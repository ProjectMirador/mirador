import { render, screen, fireEvent } from '@tests/utils/test-utils';
import { ImageWithFallback } from '../../../src/components/ImageWithFallback';
import FailedImageContext from '../../../src/contexts/FailedImageContext';

describe('ImageWithFallback', () => {
  it('renders the image', () => {
    render(<ImageWithFallback src="http://example.org/image.jpg" alt="" fallback={<div data-testid="fallback" />} />);

    expect(screen.getByRole('presentation')).toHaveAttribute('src', 'http://example.org/image.jpg');
  });

  it('renders the fallback when the image fails to load', () => {
    render(<ImageWithFallback src="http://example.org/image.jpg" alt="" fallback={<div data-testid="fallback" />} />);

    fireEvent.error(screen.getByRole('presentation'));

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });

  it('notifies FailedImageContext when the image fails to load', () => {
    const notifyFailure = vi.fn();
    render(
      <FailedImageContext.Provider value={{ fallbackImage: '', notifyFailure }}>
        <ImageWithFallback src="http://example.org/image.jpg" alt="" fallback={<div data-testid="fallback" />} />
      </FailedImageContext.Provider>,
    );

    fireEvent.error(screen.getByRole('presentation'));

    expect(notifyFailure).toHaveBeenCalledWith('http://example.org/image.jpg');
  });

  it('recovers if a later src succeeds after an earlier one failed', () => {
    const { rerender } = render(
      <ImageWithFallback src="http://example.org/bad.jpg" alt="" fallback={<div data-testid="fallback" />} />,
    );

    fireEvent.error(screen.getByRole('presentation'));
    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    rerender(<ImageWithFallback src="http://example.org/good.jpg" alt="" fallback={<div data-testid="fallback" />} />);

    expect(screen.getByRole('presentation')).toHaveAttribute('src', 'http://example.org/good.jpg');
  });
});

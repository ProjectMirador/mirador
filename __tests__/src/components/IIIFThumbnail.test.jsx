import { render, screen, act } from '@tests/utils/test-utils';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { IIIFThumbnail } from '../../../src/components/IIIFThumbnail';
import FailedImageContext from '../../../src/contexts/FailedImageContext';

/**
 * Helper function to create a shallow wrapper around IIIFThumbnail
 */
function createWrapper(props) {
  return render(
    <IIIFThumbnail
      resource={{}}
      {...props}
    />,
  );
}

/* eslint-disable testing-library/no-node-access, testing-library/no-container */
describe('IIIFThumbnail', () => {
  const url = 'http://example.com/iiif/image';
  const thumbnail = { height: 120, url, width: 100 };
  it('renders properly', () => {
    const { container } = createWrapper({ thumbnail });
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).not.toHaveAccessibleName();
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image'));
  });

  it('renders a placeholder if there is no image', () => {
    const { container } = createWrapper({ thumbnail });
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image'));
  });

  it('when handleIntersection is called, loads the image', async () => {
    const { container } = createWrapper({ thumbnail });
    const img = container.querySelector('img');

    act(() => {
      mockAllIsIntersecting(true);
    });

    expect(img).toHaveAttribute('src', url);
  });

  it('can be constrained by maxHeight', () => {
    const { container } = createWrapper({ maxHeight: 100, thumbnail });
    const img = container.querySelector('img');

    expect(img).toHaveStyle({ height: '100px', width: 'auto' });
  });

  it('can be constrained by maxWidth', () => {
    const { container } = createWrapper({ maxWidth: 80, thumbnail });
    const img = container.querySelector('img');

    expect(img).toHaveStyle({ height: 'auto', width: '80px' });
  });

  it('can be constrained by maxWidth and maxHeight', () => {
    const { container } = createWrapper({ maxHeight: 90, maxWidth: 50, thumbnail });
    const img = container.querySelector('img');

    expect(img).toHaveStyle({ height: '60px', width: '50px' });
  });

  it('constrains what it can when the image dimensions are unknown', () => {
    const { container } = createWrapper({ maxHeight: 90, thumbnail: { height: 120, url } });
    const img = container.querySelector('img');

    expect(img).toHaveStyle({ height: '90px', width: 'auto' });
  });

  it('renders a provided label', () => {
    createWrapper({
      classes: { label: 'label' }, label: 'Some label', labelled: true, thumbnail,
    });

    expect(screen.getByText('Some label')).toBeInTheDocument();
  });

  it('renders children', () => {
    createWrapper({ children: <span data-testid="hi" />, thumbnail });

    expect(screen.getByTestId('hi')).toBeInTheDocument();
  });

  it('handles image load failure correctly', () => {  
    const notifyFailure = vi.fn();
    const fallbackImage = 'data:image/svg+xml,fallback';
    const mockContext = {
      fallbackImage,
      hasFailed: false,
      notifyFailure,
    };

    const { container } = render(
      <FailedImageContext.Provider value={mockContext}>
        <IIIFThumbnail resource={{}} thumbnail={thumbnail} />
      </FailedImageContext.Provider>,
    );

    const img = container.querySelector('img');

    // Trigger image to load first
    act(() => {
      mockAllIsIntersecting(true);
    });

    // Simulate image load error
    act(() => {
      img.dispatchEvent(new Event('error'));
    });

    expect(notifyFailure).toHaveBeenCalled();
    expect(img).toHaveAttribute('src', fallbackImage);
    expect(img).toHaveAttribute('alt', 'Thumbnail image unavailable');
  });

  it('applies object-fit contain style when using fallback image', () => {
    const fallbackImage = 'data:image/svg+xml,fallback';
    const mockContext = {
      fallbackImage,
      hasFailed: false,
      notifyFailure: vi.fn(),
    };

    const { container } = render(
      <FailedImageContext.Provider value={mockContext}>
        <IIIFThumbnail resource={{}} thumbnail={thumbnail} maxWidth={80} maxHeight={90} />
      </FailedImageContext.Provider>,
    );

    const img = container.querySelector('img');

    // Trigger image to load
    act(() => {
      mockAllIsIntersecting(true);
    });

    // Simulate image load error to trigger fallback
    act(() => {
      img.dispatchEvent(new Event('error'));
    });

    // Should apply objectFit: contain with max dimensions
    expect(img).toHaveStyle({
      maxHeight: '90px',
      maxWidth: '80px',
      objectFit: 'contain',
    });
  });
});

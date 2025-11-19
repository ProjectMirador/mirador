import { act, render } from '@tests/utils/test-utils';
import TileSource from '../../../src/components/OpenSeadragonTileSource';
import OpenSeadragonViewerContext from '../../../src/contexts/OpenSeadragonViewerContext';
import FailedImageProvider from '../../../src/contexts/FailedImageProvider';
import config from '../../../src/config/settings';

const tileSourceExample = { '@id': 'http://example.com/image/info.json' };

/* eslint-disable react/prop-types */
/**
 * Test wrapper for OpenSeadragonTileSource with contexts
 */
const Subject = ({ viewer, tileSource, ...props }) => (
  <FailedImageProvider>
    <OpenSeadragonViewerContext.Provider value={viewer}>
      <TileSource tileSource={tileSource} {...props} />
    </OpenSeadragonViewerContext.Provider>
  </FailedImageProvider>
);
/* eslint-enable react/prop-types */

describe('OpenSeadragonTileSource', () => {
  it('calls addTiledImage with the tile source', () => {
    const mockViewer = {
      addTiledImage: vi.fn(),
    };
    const ref = { current: mockViewer };

    render(<Subject viewer={ref} tileSource={tileSourceExample} />);
    expect(mockViewer.addTiledImage).toHaveBeenCalledWith(
      expect.objectContaining({ tileSource: tileSourceExample }),
    );
  });

  it('updates the opacity when the prop changes', async () => {
    const mockItem = { setOpacity: vi.fn() };
    const mockViewer = {
      addTiledImage: vi.fn().mockImplementation(({ success }) => success({ item: mockItem })),
      world: { removeItem: vi.fn() },
    };
    const ref = { current: mockViewer };

    const { rerender } = render(<Subject viewer={ref} tileSource={tileSourceExample} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      rerender(<Subject viewer={ref} tileSource={tileSourceExample} opacity={0.5} />);
    });

    expect(mockViewer.addTiledImage).toHaveBeenCalledTimes(1);
    expect(mockItem.setOpacity).toHaveBeenCalledWith(0.5);
  });

  it('updates the index when the prop changes', async () => {
    const mockItem = {};
    const mockViewer = {
      addTiledImage: vi.fn().mockImplementation(({ success }) => success({ item: mockItem })),
      world: { removeItem: vi.fn(), setItemIndex: vi.fn() },
    };
    const ref = { current: mockViewer };

    const { rerender } = render(<Subject viewer={ref} tileSource={tileSourceExample} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      rerender(<Subject viewer={ref} tileSource={tileSourceExample} index={5} />);
    });

    expect(mockViewer.addTiledImage).toHaveBeenCalledTimes(1);
    expect(mockViewer.world.setItemIndex).toHaveBeenCalledWith(mockItem, 5);
  });

  it('updates the rendered bounds when the prop changes', async () => {
    const mockItem = { fitBounds: vi.fn() };
    const mockViewer = {
      addTiledImage: vi.fn().mockImplementation(({ success }) => success({ item: mockItem })),
      world: { removeItem: vi.fn(), setItemIndex: vi.fn() },
    };
    const ref = { current: mockViewer };

    const { rerender } = render(<Subject viewer={ref} tileSource={tileSourceExample} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      rerender(<Subject viewer={ref} tileSource={tileSourceExample} fitBounds={[0, 0, 10, 10]} />);
    });

    expect(mockViewer.addTiledImage).toHaveBeenCalledTimes(1);
    expect(mockItem.fitBounds).toHaveBeenCalled();
  });

  it('deletes the item from the world when the item is unmounted', async () => {
    const mockItem = {};
    const mockViewer = {
      addTiledImage: ({ success }) => success({ item: mockItem }),
      world: { removeItem: vi.fn() },
    };
    const ref = { current: mockViewer };

    const { unmount } = render(<Subject viewer={ref} tileSource={tileSourceExample} />);

    // Trigger unmount to run cleanup
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      unmount();
    });

    // Assert removeItem was called
    expect(mockViewer.world.removeItem).toHaveBeenCalledWith(mockItem);
  });

  it('loads fallback image when the tile load fails', async () => {
    const addTiledImage = vi
      .fn()
      .mockImplementationOnce(({ error }) => error(new Error('fail')))
      .mockImplementationOnce(({ success }) => success({ item: { id: 'fallback' } }));

    const mockViewer = {
      addTiledImage,
      world: { removeItem: vi.fn() },
    };
    const ref = { current: mockViewer };

    // Set a test fallback image
    config.fallbackImage = 'http://example.com/fallback.jpg';

    render(<Subject viewer={ref} tileSource={tileSourceExample} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {});

    expect(addTiledImage).toHaveBeenCalledTimes(2);

    const fallbackCall = addTiledImage.mock.calls[1][0];

    const expectedUrl = expect(fallbackCall.tileSource).toEqual({
      type: 'image',
      url: 'http://example.com/fallback.jpg',
    });
  });
});

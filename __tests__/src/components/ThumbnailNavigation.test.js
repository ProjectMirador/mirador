import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Utils } from 'manifesto.js';
import { ThumbnailNavigation } from '../../../src/components/ThumbnailNavigation';
import ThumbnailCanvasGrouping from '../../../src/containers/ThumbnailCanvasGrouping';
import CanvasGroupings from '../../../src/lib/CanvasGroupings';
import manifestJson from '../../fixtures/version-2/019.json';
import zeroWidthFixture from '../../fixtures/version-2/zeroWidthCanvas.json';
import createPluggableStore from '../../../src/state/createPluggableStore';


export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createPluggableStore(preloadedState, []),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
/** create wrapper */
function createWrapper(props, fixture = manifestJson) {
  return renderWithProviders(
    <ThumbnailNavigation
      canvasGroupings={
        new CanvasGroupings(
          Utils.parseManifest(fixture).getSequences()[0].getCanvases(),
        ).groupings()
      }
      canvasIndex={1}
      classes={{}}
      windowId="foobar"
      thumbnailNavigation={{ height: 150, width: 100 }}
      position="far-bottom"
      t={k => k}
      {...props}
    />,
  );
}

jest.mock(
  'react-virtualized-auto-sizer',
  () => ({ children }) => children({ height: 600, width: 600 })
)

describe('ThumbnailNavigation', () => {
  it('renders the component', async () => {
    createWrapper();

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
  it('renders containers based off of number of canvases', () => {
    createWrapper();

    expect(screen.getAllByRole('gridcell').length).toEqual(3);
  });
  // it('has a ref set used to reset on view change', () => {
  //   expect(wrapper.instance().gridRef).not.toBe(null);
  // });
  // it('triggers a resetAfterIndex on view change', () => {
  //   const mockReset = jest.fn();
  //   wrapper.instance().gridRef = { current: { resetAfterIndex: mockReset } };
  //   wrapper.setProps({
  //     canvasIndex: 1,
  //     view: 'book',
  //   });
  //   expect(mockReset).toHaveBeenCalled();
  // });
  // it('triggers a scrollToItem on canvasIndex change', () => {
  //   const mockScroll = jest.fn();
  //   wrapper.instance().gridRef = { current: { scrollToItem: mockScroll } };
  //   wrapper.setProps({
  //     canvasIndex: 3,
  //   });
  //   expect(mockScroll).toHaveBeenCalled();
  // });

  it('gives the grid a size', () => {
      const { unmount } = createWrapper();
      expect(screen.getByRole('grid')).toHaveStyle({ height: '150px', width: '100%' });

      unmount();

      createWrapper({ position: 'far-right' });
      expect(screen.getByRole('grid')).toHaveStyle({ height: '100%', minHeight: 0, width: '123px' });
    });
  //   it('rightWidth', () => {
  //     expect(wrapper.instance().rightWidth()).toEqual(100);
  //     const mockReset = jest.fn();
  //     wrapper.instance().gridRef = { current: { resetAfterIndex: mockReset } };
  //     wrapper.setProps({
  //       canvasIndex: 1,
  //       view: 'book',
  //     });
  //     expect(wrapper.instance().rightWidth()).toEqual(200);
  //   });

    it('calculates the scaled width of each cell', () => {
      createWrapper();

      expect(screen.getAllByRole('gridcell')[0]).toHaveStyle({ width: '74px' });
    });

    it('calculates the scaled height of each cell when on the right', () => {
      createWrapper({ position: 'far-right' });
      expect(screen.getAllByRole('gridcell')[0]).toHaveStyle({ height: '150px' });
    });

    it('keeps a minimum size for each cell', () => {
      createWrapper({}, zeroWidthFixture);

      expect(screen.getAllByRole('gridcell')[0]).toHaveStyle({ width: '100px' });
    });

    it('keeps a minimum size for each cell when on the right', () => {
      createWrapper({ position: 'far-right' }, zeroWidthFixture);

      expect(screen.getAllByRole('gridcell')[0]).toHaveStyle({ height: '100px' });
    });
  describe('keyboard navigation', () => {
    const setNextCanvas = jest.fn();
    const setPreviousCanvas = jest.fn();
    let user;
    beforeEach(() => {
      user = userEvent.setup();
      // createWrapper({
      //   canvasIndex: 1,
      //   hasNextCanvas: true,
      //   hasPreviousCanvas: true,
      //   setNextCanvas,
      //   setPreviousCanvas,
      // });
    });
    describe('handleKeyUp', () => {
      it('handles right arrow by advancing the current canvas', async () => {
        createWrapper({ canvasIndex: 1, hasNextCanvas: true, setNextCanvas });

        screen.getByRole('grid').focus();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowRight', code: 'ArrowRight' });
        expect(setNextCanvas).toHaveBeenCalled();
      });
      it('handles down arrow by advancing the current canvas when the canvas is on the right', () => {
        createWrapper({ canvasIndex: 1, hasNextCanvas: true, position: 'far-right', setNextCanvas });

        screen.getByRole('grid').focus();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowDown', code: 'ArrowDown' });
        expect(setNextCanvas).toHaveBeenCalled();
      });
      it('handles left arrow by selecting the previous canvas', () => {
        createWrapper({ canvasIndex: 2, hasPreviousCanvas: true, setPreviousCanvas });

        screen.getByRole('grid').focus();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(setPreviousCanvas).toHaveBeenCalled();
      });
      it('handles up arrow by selecting the previous canvas when the canvas is on the right', () => {
        createWrapper({ canvasIndex: 2, hasPreviousCanvas: true, position: 'far-right', setPreviousCanvas });

        screen.getByRole('grid').focus();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowUp', code: 'ArrowUp' });
        expect(setPreviousCanvas).toHaveBeenCalled();
      });
    });
  });
  describe('when viewingDirection="right-to-left"', () => {
    it('sets up react-window to be rtl', () => {
      createWrapper({ viewingDirection: 'right-to-left' });

      expect(screen.getByRole('row').children[0]).toHaveStyle({ direction: 'rtl' });
    });
  });
});

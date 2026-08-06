import { MosaicWindowContext } from 'react-mosaic-component';
import { render, screen } from '@tests/utils/test-utils';
import textManifest from '../../fixtures/version-3/text-pdf.json';

import { Window } from '../../../src/components/Window';

/** create wrapper */
function createWrapper(props, state, renderOptions) {
  return render(
    <Window windowId="xyz" manifestId="foo" classes={{}} {...props} />,
    {
      preloadedState: {
        ...state,
        windows: {
          ...state?.windows,
          xyz: {
            collectionDialogOn: false,
            companionWindowIds: [],
            ...state?.windows?.xyz,
          },
        },
      },
    },
    { renderOptions },
  );
}

describe('Window', () => {
  it('renders the outer section without repeating the window title as its accessible name', () => {
    const manifestId = textManifest.id;
    const { container } = createWrapper(
      {},
      {
        manifests: {
          [manifestId]: {
            id: manifestId,
            json: textManifest,
          },
        },
        windows: { xyz: { manifestId } },
      },
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const windowElement = container.querySelector('section.mirador-window');

    expect(windowElement).not.toHaveAttribute('aria-label');
    expect(screen.getByRole('heading', { level: 2, name: 'Simplest Text Example 1' })).toBeInTheDocument();
  });
  it('should render <WindowTopBar>', () => {
    createWrapper();
    expect(screen.getByRole('navigation', { accessibleName: 'Window navigation' })).toBeInTheDocument();
  });
  it('should render <PrimaryWindow>', () => {
    createWrapper();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.mirador-primary-window')).toBeInTheDocument();
  });
  // See ErrorContent.test.js for futher testing of this functionality
  it('renders alert box when there is an error', async () => {
    createWrapper({ manifestError: 'Invalid JSON' });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
  describe('when workspaceType is mosaic', () => {
    it('calls the context mosaicWindowActions connectDragSource method to make WindowTopBar draggable', () => {
      const connectDragSource = vi.fn((component) => component);
      render(
        <MosaicWindowContext.Provider value={{ mosaicWindowActions: { connectDragSource } }}>
          <Window windowId="xyz" manifestId="foo" classes={{}} windowDraggable workspaceType="mosaic" />
        </MosaicWindowContext.Provider>,
        {
          preloadedState: {
            windows: {
              xyz: {
                collectionDialogOn: false,
                companionWindowIds: [],
              },
            },
          },
        },
      );
      expect(connectDragSource).toHaveBeenCalled();
    });
    it('does not call the context mosaicWindowActions connectDragSource when the windowDraggable is set to false', () => {
      const connectDragSource = vi.fn((component) => component);
      render(
        <MosaicWindowContext.Provider value={{ mosaicWindowActions: { connectDragSource } }}>
          <Window windowId="xyz" manifestId="foo" classes={{}} windowDraggable={false} workspaceType="mosaic" />
        </MosaicWindowContext.Provider>,
        {
          preloadedState: {
            windows: {
              xyz: {
                collectionDialogOn: false,
                companionWindowIds: [],
              },
            },
          },
        },
      );
      expect(connectDragSource).not.toHaveBeenCalled();
    });
  });
});

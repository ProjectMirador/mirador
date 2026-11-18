import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { buildManifestV2, buildManifestV3 } from '@tests/utils/build-manifest';
import { buildMiradorState } from '@tests/utils/build-state';
import SearchHit from '@src/containers/SearchHit';

vi.mock('@src/components/ScrollTo', () => ({
  // eslint-disable-next-line react/prop-types
  ScrollTo: ({ children }) => <div data-testid="scrollto">{children}</div>,
}));

const defaultHit = {
  after: ', and start the chainsaw',
  annotations: ['foo'],
  before: 'Light up the',
  match: 'moose',
};

describe.each([
  ['Presentation 2', buildManifestV2()],
  ['Presentation 3', buildManifestV3()],
])('SearchHit (%s)', (_label, manifest) => {
  const renderHit = (
    props = {},
    { resources = [{ '@id': 'foo', on: 'canvas-1' }], selectedContentSearchAnnotationIds = [] } = {},
  ) => {
    const preloadedState = buildMiradorState({
      windows: [
        {
          companionWindows: [
            {
              content: 'search',
              data: {
                data: {
                  'search?q=moose': {
                    json: {
                      hits: [defaultHit],
                      resources,
                    },
                  },
                },
                selectedContentSearchAnnotationIds,
              },
            },
          ],
          manifest,
        },
      ],
    });

    const [windowId] = preloadedState.workspace.windowIds;
    const [companionWindowId] = preloadedState.windows[windowId].companionWindowIds;

    const hitProps = {
      annotationId: 'foo',
      companionWindowId,
      hit: defaultHit,
      index: 0,
      windowId,
      ...props,
    };

    return {
      ...render(<SearchHit {...hitProps} />, { preloadedState }),
      companionWindowId,
      hitProps,
      windowId,
    };
  };

  it('dispatches selectAnnotation when clicked and highlights windowSelected hits', async () => {
    const user = userEvent.setup();
    const { store, windowId } = renderHit();

    expect(screen.getByRole('listitem')).not.toHaveClass('windowSelected');
    expect(screen.getByRole('listitem')).toHaveTextContent('1Light up the moose , and start the chai more');

    await user.click(screen.getByRole('button', { name: /Light up the moose/ }));

    expect(store.getState().windows[windowId].selectedAnnotationId).toEqual('foo');
    expect(screen.getByRole('listitem')).toHaveClass('windowSelected');
  });

  it('renders a ListItem for a selected hit', () => {
    renderHit({}, { selectedContentSearchAnnotationIds: ['foo'] });

    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('renders the annotation char if the hit is not available', () => {
    renderHit({ hit: undefined }, { resources: [{ '@id': 'foo', on: 'canvas-1', resource: { chars: 'xyz' } }] });

    expect(screen.getByRole('listitem')).toHaveTextContent('1xyz');
  });

  it('renders a ScrollTo', () => {
    renderHit();

    expect(screen.getByTestId('scrollto')).toBeInTheDocument();
  });

  describe('Annotation Labels', () => {
    it('renders the annotationLabel if present', () => {
      renderHit(
        {},
        {
          resources: [
            {
              '@id': 'foo',
              '@type': 'oa:Annotation',
              label: 'The Anno Label',
              motivation: 'sc:painting',
              on: 'canvas-1',
            },
          ],
        },
      );

      expect(screen.getByRole('heading', { level: 4, name: 'Canvas 1 The Anno Label' })).toBeInTheDocument();
    });

    it('does not render the typography if no annotation label is present', () => {
      renderHit();

      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });
  });

  describe('announcer', () => {
    it('sends information about the annotation when selected', async () => {
      const user = userEvent.setup();
      const announcer = vi.fn();
      renderHit({ announcer, total: 9 }, { selectedContentSearchAnnotationIds: [] });

      expect(announcer).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: /Light up the moose/ }));

      expect(announcer).toHaveBeenCalledWith('1 of 9 Canvas 1  Light up the moose , and start the chai', 'polite');
    });

    it('calls the announcer when initially rendered as selected', () => {
      const announcer = vi.fn();
      renderHit({ announcer, total: 9 }, { selectedContentSearchAnnotationIds: ['foo'] });

      expect(announcer).toHaveBeenCalledWith('1 of 9 Canvas 1  Light up the moose , and start the chai', 'polite');
    });

    it('does not call the announcer when initially rendered as unselected', () => {
      const announcer = vi.fn();
      renderHit({ announcer, total: 9 }, { selectedContentSearchAnnotationIds: [] });

      expect(announcer).not.toHaveBeenCalled();
    });

    it('does not send information about annotations that are not being deselected', () => {
      const announcer = vi.fn();
      const { hitProps, rerender } = renderHit({ announcer, total: 9 }, { selectedContentSearchAnnotationIds: ['foo'] });

      announcer.mockClear();

      rerender(<SearchHit {...hitProps} />);

      expect(announcer).not.toHaveBeenCalled();
    });
  });
});

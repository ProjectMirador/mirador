import { render, screen } from '@tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchHit } from '@src/components/SearchHit';

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

/** */
function buildPreloadedState({ selectedAnnotationId = undefined, selectedContentSearchAnnotationIds = [] } = {}) {
  return {
    companionWindows: { cwid: { windowId: 'window' } },
    searches: {
      window: {
        cwid: {
          data: {
            'search?q=moose': {
              json: {
                hits: [defaultHit],
                resources: [{ '@id': 'foo', on: 'canvas-1' }],
              },
            },
          },
          selectedContentSearchAnnotationIds,
        },
      },
    },
    windows: {
      window: {
        selectedAnnotationId,
      },
    },
  };
}

describe('SearchHit', () => {
  it('dispatches selectAnnotation when clicked and highlights windowSelected hits', async () => {
    const user = userEvent.setup();
    const { store } = render(
      <SearchHit annotationId="foo" companionWindowId="cwid" hit={defaultHit} index={0} windowId="window" />,
      { preloadedState: buildPreloadedState({ selectedAnnotationId: 'foo' }) },
    );

    expect(screen.getByRole('listitem')).toHaveClass('windowSelected');
    await user.click(screen.getByRole('button', { name: /Light up the moose/ }));
    expect(store.getState().windows.window.selectedAnnotationId).toEqual('foo');
  });

  describe('announcer', () => {
    it('sends information about the annotation when selected', () => {
      const announcer = vi.fn();
      const { rerender } = render(
        <SearchHit
          announcer={announcer}
          annotationId="foo"
          companionWindowId="cwid"
          hit={defaultHit}
          index={0}
          total={9}
          windowId="window"
        />,
        { preloadedState: buildPreloadedState({ selectedContentSearchAnnotationIds: [] }) },
      );

      expect(announcer).not.toHaveBeenCalled();

      rerender(
        <SearchHit
          announcer={announcer}
          annotationId="foo"
          companionWindowId="cwid"
          hit={defaultHit}
          index={0}
          total={9}
          windowId="window"
        />,
      );
      // Note: to test state transition in Redux, dispatch selectAnnotation or render selected initially
    });

    it('calls the announcer when initially rendered as selected', () => {
      const announcer = vi.fn();
      render(
        <SearchHit
          announcer={announcer}
          annotationId="foo"
          companionWindowId="cwid"
          hit={defaultHit}
          index={0}
          total={9}
          windowId="window"
        />,
        { preloadedState: buildPreloadedState({ selectedContentSearchAnnotationIds: ['foo'] }) },
      );

      expect(announcer).toHaveBeenCalledWith('1 of 9   Light up the moose , and start the chai', 'polite');
    });

    it('does not call the announcer when initially rendered as unselected', () => {
      const announcer = vi.fn();
      render(
        <SearchHit
          announcer={announcer}
          annotationId="foo"
          companionWindowId="cwid"
          hit={defaultHit}
          index={0}
          total={9}
          windowId="window"
        />,
        { preloadedState: buildPreloadedState({ selectedContentSearchAnnotationIds: [] }) },
      );

      expect(announcer).not.toHaveBeenCalled();
    });
  });
});

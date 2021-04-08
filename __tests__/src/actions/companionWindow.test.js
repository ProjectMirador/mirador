import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

jest.mock('../../../src/state/selectors', () => ({
  getManuallyExpandedNodeIds: (state, args, expanded) => (expanded ? ['openVisible', 'open'] : ['closedVisible', 'closed']),
  getVisibleNodeIds: (state, args) => ['openVisible', 'closedVisible', 'visible'],
}));

describe('companionWindow actions', () => {
  describe('addCompanionWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        content: 'info',
        foo: 'bar',
        position: 'right',
      };

      const action = actions.addCompanionWindow('abc123', payload);

      expect(action.type).toBe(ActionTypes.ADD_COMPANION_WINDOW);
      expect(action.id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
      expect(action.windowId).toEqual('abc123');
      expect(action.payload).toMatchObject(payload);
      expect(action.payload.id).toEqual(action.id);
      expect(action.payload.windowId).toEqual(action.windowId);
    });
  });

  describe('updateCompanionWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        content: 'info',
        foo: 'bar',
        position: 'right',
      };

      const action = actions.updateCompanionWindow('abc123', 'cw-123', payload);

      expect(action.type).toBe(ActionTypes.UPDATE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = actions.removeCompanionWindow('window', 'cw-123');
      expect(action.type).toBe(ActionTypes.REMOVE_COMPANION_WINDOW);
      expect(action.id).toBe('cw-123');
      expect(action.windowId).toBe('window');
    });
  });

  describe('toggleNode', () => {
    let mockDispatch;
    let mockGetState;

    beforeEach(() => {
      mockDispatch = jest.fn(() => ({}));
      mockGetState = jest.fn(() => ({}));
    });

    it('returns a collapsing action for visible nodes that are not present in the state', () => {
      const thunk = actions.toggleNode('window1', 'cw1', 'visible');
      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action.id).toBe('cw1');
      expect(action.windowId).toBe('window1');
      expect(action.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(action.payload).toMatchObject({ visible: { expanded: false } });
    });

    it('returns an expanding action for non visible nodes that are not present in the state', () => {
      const thunk = actions.toggleNode('window1', 'cw1', 'foo');
      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action.id).toBe('cw1');
      expect(action.windowId).toBe('window1');
      expect(action.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(action.payload).toMatchObject({ foo: { expanded: true } });
    });

    it('returns a correct action any node that is present in the state', () => {
      const openVisibleThunk = actions.toggleNode('window1', 'cw1', 'openVisible');
      openVisibleThunk(mockDispatch, mockGetState);

      const openThunk = actions.toggleNode('window1', 'cw1', 'open');
      openThunk(mockDispatch, mockGetState);

      const closedVisibleThunk = actions.toggleNode('window1', 'cw1', 'closedVisible');
      closedVisibleThunk(mockDispatch, mockGetState);

      const closedThunk = actions.toggleNode('window1', 'cw1', 'closed');
      closedThunk(mockDispatch, mockGetState);

      const actionForOpenVisible = mockDispatch.mock.calls[0][0];
      expect(actionForOpenVisible.id).toBe('cw1');
      expect(actionForOpenVisible.windowId).toBe('window1');
      expect(actionForOpenVisible.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(actionForOpenVisible.payload).toMatchObject({ openVisible: { expanded: false } });

      const actionForOpen = mockDispatch.mock.calls[1][0];
      expect(actionForOpen.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(actionForOpen.payload).toMatchObject({ open: { expanded: false } });

      const actionForClosedVisible = mockDispatch.mock.calls[2][0];
      expect(actionForClosedVisible.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(actionForClosedVisible.payload).toMatchObject({ closedVisible: { expanded: true } });

      const actionForClosed = mockDispatch.mock.calls[3][0];
      expect(actionForClosed.type).toBe(ActionTypes.TOGGLE_TOC_NODE);
      expect(actionForClosed.payload).toMatchObject({ closed: { expanded: true } });
    });
  });
});
